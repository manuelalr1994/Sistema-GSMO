import { Module } from "@nestjs/common";
import { CRUDService } from "./CRUD.service";
import { ActionModule } from "../action-logs/action.module";

@Module({
    imports: [ ActionModule ],
    providers: [ CRUDService ],
    exports: [ CRUDService, ActionModule ]
  })
  export class CRUDModule {}