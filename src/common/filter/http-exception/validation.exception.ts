import { HttpException, HttpStatus } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { ApiErrorCode } from "src/common/enum/api-error-code.enum";

export class ValidationException extends HttpException {
    
    private errorMessage: string;
    private errorCode: ApiErrorCode;
    private errorObject: ValidationError[];

    constructor(
        errorMessage: string,
        errorCode: ApiErrorCode,
        error: ValidationError[],
        statusCode: HttpStatus = HttpStatus.OK,
    ) {
        super(errorMessage, statusCode)
        this.errorMessage = errorMessage
        this.errorCode = errorCode
        this.errorObject = error
    }

    getErrorCode(): ApiErrorCode {
        return this.errorCode;
    }

    getErrorMessage(): string {
        return this.errorMessage;
    }
    
    getError(): Object {
        return this.errorObject;
    }
}