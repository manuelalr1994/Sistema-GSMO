import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ActionService } from './action.service';

@Injectable()
export class ActionMiddleware implements NestMiddleware {

    constructor(
        private readonly actionService: ActionService
    ) { }

    use(req: Request, res: Response, next: () => void) {
        
        res.on('close', () => {
            if (req.method === 'GET') return;

            if(res.statusCode >= 400) return;

            this.actionService.create(
                req.originalUrl,
                "User (Not implemented)",
                req.method
            )
        });
        next();
    }
}