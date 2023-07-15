import { CRUD_ERRORS } from "src/common/constants/errors.const";
import { EntityMetadata, FindOperator, ILike } from "typeorm";
import { IField, validateFields } from "../validators/fields.validator";
import { emptyObject, emptyString } from "src/common/validators/empty.validator";

type IWhere = {
    [key: string]: FindOperator<any> | number | boolean | string;
} | {}

interface IFilters {
    [key: string]: string;
}

export const addFilters = async (
    entityMetadata: EntityMetadata,
    filters: IFilters

): Promise<{ where: IWhere }> => {

    let where: IWhere = {};

    if (emptyObject(filters)) return { where };

    const wantedFields = Object.keys(filters);
    const { fieldsInfo } = await validateFields(entityMetadata, wantedFields, { onlyColumns: true });



    //Iterate over all the filters to find the correct find methods, and build the where object
    for (const fieldInfo of fieldsInfo) {

        const filterValue = filters[fieldInfo.path];

        if (emptyString(filterValue)) CRUD_ERRORS.emptyFilter(fieldInfo.path);

        const findOperator = getFindOperator(fieldInfo, filterValue);

        const fieldPath = fieldInfo.path;
        const fieldPathElements = fieldPath.split('.');

        let currentWhere = where;

        for (let i = 0; i < fieldPathElements.length; i++) {
            const fieldPathElement = fieldPathElements[i];

            if (i === fieldPathElements.length - 1) {
                currentWhere[fieldPathElement] = findOperator;
                break;
            }

            currentWhere[fieldPathElement] = currentWhere[fieldPathElement] || {};
            currentWhere = currentWhere[fieldPathElement];

        }

    }

    return { where };
}


// This function is used to get the correct find method for the filtered column type
const getFindOperator = (field: IField, filterValue: string) => {

    const columnType = typeof field.columnType === 'function' ? typeof field.columnType(filterValue) : field.columnType;

    switch (columnType) {
        case 'string': case 'text':
            return ILike(`${filterValue}%`);
        case 'number':
            if (isNaN(Number(filterValue))) CRUD_ERRORS.notNumberFilter(field.path);
            return parseInt(filterValue);
        case 'boolean':
            if (filterValue !== 'true' && filterValue !== 'false') CRUD_ERRORS.notBooleanFilter(field.path);
            return filterValue === 'true' ? true : false;
        default:
            return filterValue;
    }
}