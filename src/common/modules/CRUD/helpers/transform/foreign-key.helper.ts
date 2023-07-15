import { ROLES_BY_ID } from "src/common/constants/roles.const";
import { Repository } from "typeorm";
import { HttpException } from "@nestjs/common";
import { HTTP_METHOD } from "../../../../constants/operation.enum";
import { Debugger } from "src/common/modules/debug/helpers/debug.helper";

export const transformForeignIds = <T>(
    entities: T[],
    repository: Repository<T>,
    operation: HTTP_METHOD
    
    ): T[] => {

    if (operation === HTTP_METHOD.GET) return entities;

    const metadata = repository.metadata;
    const relations = metadata.relations.map(relation => relation.propertyName);

    entities = entities.map(entity => {

        Object.keys(entity).forEach(key => {

            if (!relations.includes(key) && !(key === 'role')) return;

            const isOriginalArray = Array.isArray(entity[key]);
            const iterableIds = isOriginalArray ? entity[key] : [entity[key]];

            let newIds = [];

            for (let i = 0; i < iterableIds.length; i++) {

                let currentId: string | number = iterableIds[i];

                try {
                    parseInt(currentId as string);

                } catch {
                    throw new HttpException(`${key} debe ser de tipo number o numeric string`, 400);
                }

                if (key === 'role') {
                    const newId = ROLES_BY_ID[currentId as number];
                    newIds.push(newId);
                    continue;
                }
                
                if (relations.includes(key)) {
                    const newId = { id: currentId as number };
                    newIds.push(newId);
                    Debugger.log({ newId, key });
                    continue;
                }
            }

            Debugger.log({ newIds });

            entity[key] = isOriginalArray ? newIds : newIds[0];
            
        });

        return entity;
    });

    // Debugger.log({ foreignKeyHelper: entities });

    return entities
}