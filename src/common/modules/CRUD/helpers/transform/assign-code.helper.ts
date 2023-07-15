import { Repository } from "typeorm"
import { HTTP_METHOD } from "../../../../constants/operation.enum";
import { Debugger } from "src/common/modules/debug/helpers/debug.helper";

export const assignCode = async <T>(
    entities: T[],
    constraints: string | string[],
    repository: Repository<any>,
    operation: HTTP_METHOD

    ): Promise<T[]> => {

    if (!constraints) return entities;
    if (!Array.isArray(constraints)) constraints = [constraints];
    if (operation !== HTTP_METHOD.POST) return entities;

    let where = {}
    const sample = entities[0]

    for (const constraint of constraints) {
        where[constraint] = sample[constraint]
    }
    
    const [lastOne] = await repository.find({
        where,
        order: { id: "DESC" },
        take: 1
    })

    let code = lastOne ? parseInt(lastOne.code) + 1 : 1

    for (const item of entities) {
        item["code"] = code.toString().padStart(3, "0");
        code++;
    }

    // Debugger.log(data);

    // Debugger.log({ assignCode: entities });

    return entities;
}