import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

export const ApiPagination = () => {

    return applyDecorators(
        ApiQuery({ name: 'page', description: 'Número de Pagina', required: false, type: Number, example: 1 }),
        ApiQuery({ name: 'limit', description: 'Elementos por pagina', required: false, type: Number, example: 10 }),
        ApiQuery({ name: 'sort', description: 'Ordenar por columna', required: false, type: String, example: 'id' }),
        ApiQuery({ name: 'order', description: 'Descendiente / Ascendiente, (ASC/DESC)', required: false, type: String, example: 'ASC' }),
        ApiQuery({ name: 'fields', description: 'Columnas deseadas (separadas por coma)', required: false, type: String, example: 'id,name' })
    );
}
