import { HttpException, HttpStatus } from "@nestjs/common";
import { BooleanTransformOptions } from "src/common/modules/CRUD/interfaces/crud-options.interface";
import { Debugger } from "src/common/modules/debug/helpers/debug.helper";

export const transformBooleans = <T>(
    entities: T[],
    options: BooleanTransformOptions
    
    ): T[] => {

    if (!options) return entities;

    for (let key in options) {

        let whenTrue = options[key].whenTrue;
        let whenFalse = options[key].whenFalse;
        let lowerCaseTrue = whenTrue.toLowerCase();
        let lowerCaseFalse = whenFalse.toLowerCase();

        entities = entities.map(entity => {

            if (entity[key] === undefined) return entity;

            // Debugger.log(`Objeto completo: ${entity}`);
            // Debugger.log(`Transformando ${key}`);
            // Debugger.log(`Antes: ${entity[key]}`);

            switch (entity[key].toString().toLowerCase()) {
                case lowerCaseTrue:
                    entity[key] = true;
                    break;

                case lowerCaseFalse:
                    entity[key] = false;
                    break;

                case 'true':
                    entity[key] = whenTrue;
                    break;

                case 'false':
                    entity[key] = whenFalse;
                    break;

                default:
                    throw new HttpException(`${key} debe ser string y solo puede ser ${lowerCaseTrue} o ${lowerCaseFalse}`, HttpStatus.BAD_REQUEST);
            }

            // Debugger.log(`Despues: ${entity[key]}`);

            return entity;
        });
        // Debugger.log(`Despues: ${entities[0][key]}`);
    }

    // Debugger.log({ booleans: entities });
    return entities;
}