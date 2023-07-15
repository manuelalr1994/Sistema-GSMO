import { PaginationMetadata } from "./page-metadata.dto";

export class PaginationResponse {

    data: any[];

    constructor( metadata: PaginationMetadata, data: any[] ) {
        Object.assign(this, metadata);
        this.data = data;
    }
}