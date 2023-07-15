import { Logger } from "@nestjs/common";
import { Request } from "express";
import { emptyObject } from "../../../validators/empty.validator";

export class Debugger {

    private static mode: boolean = true;


    public static switchMode = (debugMode?: boolean) => {

        Debugger.mode = !Debugger.mode;

        if (debugMode !== undefined) {
            Debugger.mode = debugMode;
        }

        const message = (Debugger.mode) ? "Debug mode is now ON" : "Debug mode is now OFF";

        Logger.log(message, Debugger.name);

        return { message };
    }


    public static log = (item: any) => {
        if (!Debugger.mode) return;
        console.log(item)
        console.log(" ");
    }


    public static error = (item: string) => Logger.error(item);


    public static logReq = (req: Request) => {
        if (!Debugger.mode) return;

        let logRequest = {
            method: req.method,
            endpoint: req.originalUrl,
            query: req.query,
            body: req.body
        }

        if (emptyObject(logRequest.query)) {
            delete logRequest.query;
        }

        if (emptyObject(logRequest.body)) {
            delete logRequest.body;
        }

        console.log(" ");
        console.log(" ");
        console.log(" ");
        console.log(" ");
        Logger.log("=============================={ REQUEST }==============================")
        Debugger.log({ logRequest });
    }


    public static logRes = (body: any) => {
        if (!Debugger.mode) return;

        let logResponse = { ...body }

        if (body.data) {
            logResponse.data = "..."
        } else {
            delete logResponse.data;
        }

        Debugger.log({ logResponse });
    }
}