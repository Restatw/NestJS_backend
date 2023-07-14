import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response, Request } from "express"
import { ApiException } from './api.exception';
import { ValidationException } from './validation.exception';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 
      exception instanceof HttpException 
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if( exception instanceof ValidationException ) {
      response.status(status).json({
        ok: false,
        code: exception.getErrorCode(),
        timestamp: new Date().toISOString(),
        path: request.url,
        describe: exception.getErrorMessage(),
        error: exception.getError()
      })
      return;
    }


    if( exception instanceof ApiException ) {
      response.status(status).json({
        ok: false,
        code: exception.getErrorCode(),
        timestamp: new Date().toISOString(),
        path: request.url,
        describe: exception.getErrorMessage()
      })
      return;
    }

    response.status(status).json({
      ok: false,
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      describe: exception.message
    })

  }
}
