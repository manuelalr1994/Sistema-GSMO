import { HttpException, Injectable } from '@nestjs/common';
import { Debugger } from './helpers/debug.helper';

@Injectable()
export class DebugService {

  setMode(query) {

    for (const property in query) {
      if (property !== 'mode') throw new HttpException(`query parameter "${property}" should not exist`, 400);
    }

    if (!query.mode) {
      return Debugger.switchMode();
    }

    let debugMode;
  
    switch (query.mode) {
      case 'true':
        debugMode = true;
        break;
      case 'false':
        debugMode = false;
        break;
      default:
        throw new HttpException(`query parameter "mode" should be "true" or "false"`, 400);
    }

    return Debugger.switchMode(debugMode);

  }
}
