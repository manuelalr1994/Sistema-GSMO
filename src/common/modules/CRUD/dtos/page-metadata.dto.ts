import { emptyObject, emptyString } from "src/common/validators/empty.validator";
import { PageOrder } from "../enums/page-order.enum";

export class PaginationMetadata {

    public total: number;
    public page: number;
    public limit: number;
    public skip: number;
    public sort: string;
    public order: PageOrder;
    public fields: string;
    public filters: object;

    constructor( query ) {

        query.skip = query.limit * (query.page - 1);

        if (emptyString(query.fields)) {
            delete query.fields;

        } else {
            query.fields.replace(',', ', ');            
        }

        if (emptyObject(query.filters)) {
            delete query.filters;
        }

        Object.assign(this, query);
    }
}