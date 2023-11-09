import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from "http-status-codes";

export default class RequestError extends Error {
    status: StatusCodes = StatusCodes.BAD_REQUEST;
    constructor(
        message: string,
        status?: StatusCodes,
        options?: ErrorOptions | undefined
    ) {
        super(message, options);
        this.status = status || this.status;
    }
}
