import { CONSTRAINT } from "src/common/constants/constraints.const";
import { ISelect } from "../helpers/select.helper";

export interface CrudOptions {
    title: string;
    assignCode?: CONSTRAINT | CONSTRAINT[];
    booleanTransform?: BooleanTransformOptions;
    defaultSelect?: ISelect,
    exclude?: string[];
    allowRelations?: string[];
}

export interface BooleanTransformOptions {
    [x: string]: {
        whenTrue: string;
        whenFalse: string;
    }
}