import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { Debugger } from "../modules/debug/helpers/debug.helper";

@Injectable()
export class GlobalMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: () => void) {

        

        //Convert pagination order to uppercase
        if (typeof req.query.order === 'string') {
            req.query.order = req.query.order.toUpperCase()
        }

        //Log request
        if (!req.originalUrl.includes('debug')) {
            Debugger.logReq( req )
        }
        
        const originalResponse = res.json;
        res.json = function (body: any): Response<any, Record<string, any>> {
            
            //Log response
            if (!req.originalUrl.includes('debug')) {
                Debugger.logRes( body );
            }

            return originalResponse.call(this, body);
        };

        next();
    }
}