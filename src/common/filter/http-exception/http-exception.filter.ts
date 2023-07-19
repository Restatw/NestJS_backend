import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response, Request } from "express"
import { ApiException } from './api.exception';
import { ValidationException } from './validation.exception';
import { I18nContext } from "nestjs-i18n";
import { I18nTranslations } from 'src/generated/i18n.generated';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const i18n = I18nContext.current<I18nTranslations>(host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 
      exception instanceof HttpException 
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 無效格式例外
    if( exception instanceof ValidationException ) {
      response.status(status).json({
        ok: false,
        code: exception.getErrorCode(),
        describe: i18n.t(exception.getErrorMessage()),
        error: exception.getError(),
        timestamp: new Date().toISOString(),
        path: request.url,
      })
      return;
    }

    // 請求處理發生例外
    if( exception instanceof ApiException ) {
      response.status(status).json({
        ok: false,
        code: exception.getErrorCode(),
        describe: i18n.t(exception.getErrorMessage()),
        path: request.url,
        timestamp: new Date().toISOString(),
      })
      return;
    }

    // 未定義錯誤
    response.status(status).json({
      ok: false,
      code: status,
      describe: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    })

  }
}
