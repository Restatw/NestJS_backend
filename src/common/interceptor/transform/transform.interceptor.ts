import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"

export interface Response<T> {
  data: T;
}

// 規格化回傳格式顯示
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext, 
    next: CallHandler
  ): Observable<Response<T>> {
    return next
      .handle()
      .pipe(map((data) => ({ 
        ok: true,
        code:200, 
        data,
        timestamp: new Date().toISOString(),
      })));
  }
}
