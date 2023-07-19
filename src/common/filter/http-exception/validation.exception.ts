import { HttpException, HttpStatus } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { ApiErrorCode } from "src/common/enum/api-error-code.enum";
import { I18nPath } from "src/generated/i18n.generated";

export class ValidationException extends HttpException {
    
    private errorMessage: I18nPath;
    private errorCode: ApiErrorCode;
    private errorObject: ValidationError[];

    constructor(
        errorMessage: I18nPath,
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

    getErrorMessage(): I18nPath {
        return this.errorMessage;
    }
    
    getError(): Object {
        return this.errorObject;
    }
}