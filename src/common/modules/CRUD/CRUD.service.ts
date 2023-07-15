import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { assignCode, transformBooleans, transformForeignIds } from "./helpers/transform";
import { ActionService } from "../action-logs/action.service";
import { ACTION_TYPES } from "../../enums/action.enum";
import { CRUD_ERRORS } from "../../constants/errors.const";
import { CrudOptions } from "./interfaces/crud-options.interface";

import { PaginationMetadata } from "./dtos/page-metadata.dto";
import { PaginationResponse } from "./dtos/page-reseponse.dto";
import { PaginationDto } from "./dtos/page-options.dto";
import { dtoValidate } from "../../validators/dto.validator";
import { PageOrder } from "./enums/page-order.enum";
import { addFilters } from "./helpers/where.helper";
import { addFields, defaultFields } from "./helpers/select.helper";

import { Debugger } from "../debug/helpers/debug.helper";
import { HTTP_METHOD } from "../../constants/operation.enum";

@Injectable()
export class CRUDService {

    private repository: Repository<any>;
    private table: string;
    private options: CrudOptions;

    private addLog = async (id: number, action: ACTION_TYPES, changes?) => await this.actionLogService.addLog(id, this.table, action, changes);

    constructor(
        private actionLogService: ActionService
    ) { }

    async setOptions(repository, options: CrudOptions) {
        this.repository = repository;
        this.table = repository.metadata.tableName;
        this.options = options;
    }


    async enterTransformData <T>(data: T | T[], operation: HTTP_METHOD) {
        const isOriginalArray = Array.isArray(data);
        let iterableData: T[] = isOriginalArray ? data as T[] : [data] as T[];

        iterableData = transformForeignIds(iterableData, this.repository, operation);
        iterableData = transformBooleans(iterableData, this.options.booleanTransform);
        iterableData = await assignCode(iterableData, this.options.assignCode, this.repository, operation);

        data = isOriginalArray ? iterableData : iterableData[0];
        return data;
    }


    exitTransformData(data, operation: HTTP_METHOD) {
        const originalData = data;

        const isPagination = data.data ? true : false;
        data = isPagination ? data.data : data;
        
        const isArray = Array.isArray(data);
        data = isArray ? data : [data];

        data = transformBooleans(data, this.options.booleanTransform);

        data = isArray ? data : data[0];
        data = isPagination ? { ...originalData, data } : data;
        return data;
    }


    async create(createDto) {
        const method = HTTP_METHOD.POST;

        createDto = await this.enterTransformData(createDto, method);
        
        let newEntity = await this.repository.create(createDto);
        if (!newEntity) CRUD_ERRORS.notCreated(this.options.title);
        
        await this.repository.save(newEntity);
        this.addLog(newEntity.id, ACTION_TYPES.CREATE, newEntity);

        let entityResponse = await this.findOne(newEntity.id);

        return entityResponse;
    }


    async createMany(createManyDto) {
        const method = HTTP_METHOD.POST;

        createManyDto = await this.enterTransformData(createManyDto, method);

        let createdEntities = [];

        const queryRunner = this.repository.manager.connection.createQueryRunner();
        await queryRunner.connect()
        await queryRunner.startTransaction()

        let counter = 0;
        for (let createDto of createManyDto) {
            counter++;

            const createdEntity = await this.repository.create(createDto);

            if (!createdEntity) {
                await queryRunner.rollbackTransaction()
                CRUD_ERRORS.notCreatedMany(this.options.title, counter);
            }

            createdEntities.push(createdEntity);
        }

        await queryRunner.manager.save(createdEntities);
        await queryRunner.commitTransaction()

        let foundEntities = [];

        for (const entity of createdEntities) {
            this.addLog(entity.id, ACTION_TYPES.CREATE, entity);
            const foundEntity = await this.findOne(entity.id);
            foundEntities.push(foundEntity);
        }

        return foundEntities;
    }


    async find({
        limit = 0,
        page = 1,
        sort = 'id',
        order = PageOrder.ASC,
        fields = '',
        ...filters }
    ) {
        const method = HTTP_METHOD.GET;

        const queryParameters = { limit, page, sort, order, fields };
        await dtoValidate(queryParameters, PaginationDto);

        const entityMetadata = this.repository.metadata;
        const { select, relations } = await addFields(entityMetadata, fields, this.options);
        const { where } = await addFilters(entityMetadata, filters);
        const total = await this.repository.count({ where });

        Debugger.log({where, select, relations})


        const paginationMetaData = new PaginationMetadata({
            ...queryParameters,
            filters,
            total
        });

        const queryOptions = {
            order: { [paginationMetaData.sort]: paginationMetaData.order },
            take: paginationMetaData.limit,
            skip: paginationMetaData.skip,
            where,
            relations,
            select
        };

        let data = await this.repository.find(queryOptions);
        data = await this.exitTransformData(data, method);

        let response = new PaginationResponse(paginationMetaData, data);
        return response;
    }


    async findOne(id: number) {
        const method = HTTP_METHOD.GET;

        const fields = defaultFields(this.repository.metadata, this.options);
        const { select, relations } = await addFields(this.repository.metadata, fields, this.options);

        let foundEntity = await this.repository.findOne({
            where: { id },
            select,
            relations
        });

        if (!foundEntity) CRUD_ERRORS.notFound(id, this.options.title);

        foundEntity = this.exitTransformData(foundEntity, method);

        return foundEntity
    }



    async update(id: number, updateDto) {

        updateDto = await this.enterTransformData(updateDto, HTTP_METHOD.PATCH);
        const foundEntity = await this.repository.findOne({ where: {id} });

        
        const newEntity = {
            ...foundEntity,
            ...updateDto
        }

        Debugger.log({newEntity})
        
        await this.repository.update(id, newEntity);
        this.addLog(id, ACTION_TYPES.UPDATE, newEntity);
        
        let updatedEntity = await this.findOne(id);

        return updatedEntity;
    }
}