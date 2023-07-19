import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';
import { ArgumentsValidationPipe } from './common/pipe/arguments-validation/arguments-validation.pipe';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('NestJS example')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api',app, document);

  app.useGlobalFilters(new HttpExceptionFilter()); // exception fillter 
  app.useGlobalInterceptors(new TransformInterceptor) // response interceptor
  app.useGlobalPipes(new ArgumentsValidationPipe()) // valid pipe
  await app.listen(3000);
  
}
bootstrap();
