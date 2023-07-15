import { EntityMetadata } from "typeorm";
import { validateFields } from "../validators/fields.validator";
import { emptyString } from "src/common/validators/empty.validator";
import { CrudOptions } from "../interfaces/crud-options.interface";
import { Debugger } from "../../debug/helpers/debug.helper";

interface FieldsResult {
    select: ISelect;
    relations: IRelations;
}

export interface ISelect {
    [key: string]: ISelect | boolean;
}

type IRelations = string[];

export const addFields = async (entityMetadata: EntityMetadata, fields: string, options: CrudOptions): Promise<FieldsResult> => {

    if (emptyString(fields)) {
        fields = defaultFields(entityMetadata, options);
    }

    const fieldPaths = fields.trim().split(',');

    const validatedFields = await validateFields(entityMetadata, fieldPaths, options);
    const relations: string[] = validatedFields.relations;
    const select: ISelect = getSelect(fields);

    return {
        select,
        relations
    };
}

//This function returns the mapped select object
const getSelect = (fieldPaths: string): ISelect => {

    let select = {};

    for (const fieldPath of fieldPaths.split(",")) {

        let currentSelect = select;

        const fieldElements = fieldPath.split(".");

        for (let i = 0; i < fieldElements.length; i++) {

            if (i === fieldElements.length - 1) {
                currentSelect[fieldElements[i]] = true;
                break;
            }
            currentSelect[fieldElements[i]] = currentSelect[fieldElements[i]] || {};
            currentSelect = currentSelect[fieldElements[i]];
        }
    }
    return select;
}

export const defaultFields = (entityMetadata: EntityMetadata, options: CrudOptions): string => {

    if (options.defaultSelect) {
        const select = options.defaultSelect;
        const fields = getFieldsFromSelect(select);
        return fields;
    }

    let columns = entityMetadata.columns
        .filter(
            column => !column.relationMetadata ||
                column.relationMetadata.isManyToOne ||
                options.allowRelations?.includes(column.propertyName)
        )
        .map(column => column.propertyName);


    if (options.exclude) {
        columns = columns.filter(field => !options.exclude.includes(field));
    }

    const fields = columns.join(',');

    return fields;
}

const getFieldsFromSelect = (select: ISelect): string => {
    let fieldsArray = [];

    for (const key in select) {
        if (select[key] === true) {
            fieldsArray.push(key);

        } else {

            const relation = select[key] as ISelect;
            const subFields = getFieldsFromSelect(relation);
            const subFieldsArray = subFields.split(',').map(subField => `${key}.${subField}`);
            fieldsArray = fieldsArray.concat(subFieldsArray);
        }
    }

    const fields = fieldsArray.join(',');

    return fields;
}

