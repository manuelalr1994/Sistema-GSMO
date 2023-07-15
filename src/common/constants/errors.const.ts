import { HttpException, HttpStatus } from "@nestjs/common";

const NotFound = (response: string) => { throw new HttpException(response, HttpStatus.NOT_FOUND) };
const BadRequest = (response: string) => { throw new HttpException(response, HttpStatus.BAD_REQUEST) };
const InternalServerError = (response: string) => { throw new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR) };

export const CRUD_ERRORS = {
    noResults: () => NotFound(`No se encontraron resultados`),
    notFound: (id: number, title: string) => NotFound(`${title} con id ${id} no encontrado`),

    notFoundField: (field: string, entity: string) => BadRequest(`Campo ${field} no encontrado en la entidad ${entity}`),
    duplicateField: (field: string) => BadRequest(`Campo ${field} duplicado`),
    emptyField: (index: number) => BadRequest(`Campo ${index} vacio`),
    
    notBooleanFilter: (filter: string) => BadRequest(`Filtro ${filter} debe ser booleano`),
    notNumberFilter: (filter: string) => BadRequest(`Filtro ${filter} debe ser número`),
    notColumnFilter: (filter: string) => BadRequest(`Filtro ${filter} no es columna`),
    duplicateFilter: (filter: string) => BadRequest(`Filtro ${filter} duplicado`),
    invalidFilter: (filter: string) => BadRequest(`Filtro ${filter} invalido`),
    emptyFilter: (filter: string) => BadRequest(`Filtro ${filter} vacio`),


    notCreated: (title: string) => InternalServerError(`No se pudo crear ${title}`),
    notRemoved: (id: number, title: string) => InternalServerError(`No se pudo eliminar ${title} con id ${id}`),
    notUpdated: (id: number, title: string) => InternalServerError(`No se pudo actualizar ${title} con id ${id}`),
    notCreatedMany: (title: string, counter: number) => InternalServerError(`Error al crear ${title} ${counter}`),
    maxNesting: () => InternalServerError(`Maximo anidamiento alcanzado`),
}

export const serverError = () => {
    throw new HttpException(`Algo salio mal`, HttpStatus.INTERNAL_SERVER_ERROR)
}