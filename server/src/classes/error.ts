import HttpCode from "./HttpStatusCode";

export enum ErrorNames {
    INVALID_API_KEY
}

// centralized error object that derives from Node’s Error
export class AppError extends Error {
    public readonly name: string;
    public readonly type: string | ErrorNames | null;
    public readonly httpCode: HttpCode;
    public readonly isOperational: boolean;

    constructor(
        name: string,
        type: string | ErrorNames | null,
        httpCode: HttpCode,
        description: string,
        isOperational: boolean
    ) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

        this.name = name;
        this.type = type;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}
