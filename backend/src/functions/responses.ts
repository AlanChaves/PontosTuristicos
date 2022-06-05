import { Response } from "express";

export default {
    sendResponse(
        response: Response,
        code: number,
        status: string,
        data?: any,
        statusCode?: number
    ) {
        response.statusCode = statusCode || 200;
        if (data === undefined || data === null) {
            response.json({ code: code, status: status });
        } else {
            response.json({ code: code, status: status, data: data });
        }
        response.end();
    },

    sendSuccess(response: Response, data: any) {
        this.sendResponse(response, 200, "ok", data);
    },

    sendInvalidSyntax(response: Response, data?: any) {
        this.sendResponse(response, 400, "invalid syntax", data, 400);
    },

    sendUnauthorized(response: Response, data?: any) {
        this.sendResponse(response, 401, "unauthorized", data, 401);
    },

    sendNotFound(response: Response, data?: any) {
        this.sendResponse(response, 404, "not found", data, 404);
    },

    sendInternalError(response: Response, data?: any) {
        this.sendResponse(response, 500, "internal error", data, 500);
    },

    sendBadGateway(response: Response, data?: any) {
        this.sendResponse(response, 502, "bad gateway", data, 502);
    },

    sendServiceUnavailable(response: Response, data?: any) {
        this.sendResponse(response, 503, "service unavailable", data, 503);
    },
};
