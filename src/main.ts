import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';
import { ArgumentsValidationPipe } from './common/pipe/arguments-validation/arguments-validation.pipe';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // exception fillter 
  app.useGlobalInterceptors(new TransformInterceptor) // response interceptor
  app.useGlobalPipes(new ArgumentsValidationPipe()) // valid pipe
  await app.listen(3000);
}
bootstrap();
