import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Agrega el middleware de CORS
  const corsOptions: CorsOptions = {
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  app.enableCors(corsOptions);

  // Agrega el prefijo a las rutas
  app.setGlobalPrefix('api');

  // Agrega Pipes de validación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  );

  // Agrega Swagger
  const config = new DocumentBuilder()
    .setTitle('Agroeasy Rest-Api')
    .setDescription('Agroeasy Endpoints')
    .setVersion('1.0')
    .build();

  const swaggerOptions = {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'none',
    },
    showResponseHeaders: false,
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, swaggerOptions);

  await app.listen(process.env.PORT);
}
bootstrap();
