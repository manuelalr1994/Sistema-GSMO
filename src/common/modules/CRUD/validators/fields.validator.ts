import { CRUD_ERRORS } from "src/common/constants/errors.const";
import { emptyString } from "src/common/validators/empty.validator";
import { ColumnType, EntityMetadata } from "typeorm";
import { BooleanTransformOptions } from "../interfaces/crud-options.interface";
import { CONSTRAINT } from "src/common/constants/constraints.const";
import { ISelect } from "../helpers/select.helper";

export type IField = {
    path: string,
    name: string,
    columnType?: ColumnType,
}

export type IRelations = string[]

export interface IFieldValidated {
    fieldsInfo: IField[],
    relations: IRelations,
}

export interface IFieldsValidatorOptions {
    title?: string;
    assignCode?: CONSTRAINT | CONSTRAINT[];
    booleanTransform?: BooleanTransformOptions;
    defaultSelect?: ISelect,
    exclude?: string[];
    allowRelations?: string[];
    onlyColumns?: boolean;
}


export const validateFields = async (
    metadata: EntityMetadata,
    fieldPaths: string[],
    options: IFieldsValidatorOptions,
): Promise<IFieldValidated> => {

    let fieldsInfo: IField[] = [];
    let relations: string[] = [];

    // // Iterate over the paths to get the fields and relations
    let counter = 0;
    for (const fieldPath of fieldPaths) {
        counter++;

        if (emptyString(fieldPath)) CRUD_ERRORS.emptyField(counter);

        if (options.exclude?.includes(fieldPath)) {
            CRUD_ERRORS.notFoundField(fieldPath, metadata.name)
        }

        const pathElements = fieldPath.split('.');
        let currentMetadata = metadata;
        let relationElements: string[] = [];

        for (let i = 0; i < pathElements.length; i++) {
            const currentField = pathElements[i];

            const fieldMetadata = currentMetadata.findColumnWithPropertyPath(currentField);
            const relationMetadata = currentMetadata.findRelationWithPropertyPath(currentField);

            if (!fieldMetadata) {
                if (!relationMetadata) {
                    CRUD_ERRORS.notFoundField(fieldPath, metadata.name);
                }
                
                if (!relationMetadata.isManyToOne && !options.allowRelations?.includes(fieldMetadata.propertyName)) {
                    CRUD_ERRORS.notFoundField(fieldPath, metadata.name);
                }

                relationElements.push(currentField);
                relations.push(relationElements.join('.'));
            }

            if (!fieldMetadata.relationMetadata) {
                const path = fieldPath
                const name = fieldMetadata.propertyName
                const columnType = fieldMetadata.type

                const foundField = {
                    path,
                    name,
                    columnType,
                }

                fieldsInfo.push(foundField);
                break;
            }

            if (options.onlyColumns && i === pathElements.length - 1) {
                CRUD_ERRORS.notFoundField(fieldPath, metadata.name);
            }

            currentMetadata = fieldMetadata.relationMetadata.inverseEntityMetadata;
            relationElements.push(currentField);
            relations.push(relationElements.join('.'));
        }

    }

    relations = Array.from(new Set(relations))

    return {
        fieldsInfo,
        relations,
    }
}