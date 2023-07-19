import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiErrorCode } from "src/common/enum/api-error-code.enum";
import { I18nPath } from "src/generated/i18n.generated";

export class ApiException extends HttpException {
    
    private errorMessage: I18nPath;
    // private errorMessage: string;
    private errorCode: ApiErrorCode;

    constructor(
        errorMessage: I18nPath,
        errorCode: ApiErrorCode,
        statusCode: HttpStatus = HttpStatus.OK
    ) {
        super(errorMessage, statusCode)
        this.errorMessage = errorMessage
        this.errorCode = errorCode
    }

    getErrorCode(): ApiErrorCode {
        return this.errorCode
    }

    getErrorMessage(): I18nPath {
        return this.errorMessage as I18nPath;
    }

}