import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Handle Private Network Access preflight requests
  app.use((req, res, next) => {
    if (req.headers['access-control-request-private-network']) {
      res.setHeader('Access-Control-Allow-Private-Network', 'true');
    }
    next();
  });

   const config = new DocumentBuilder()
    .setTitle('hireme API')
    .setDescription('API documentation for the hireme application')
    .setVersion('1.0')
    .addBearerAuth() // Optional: if you use bearer token authentication
    .build();

    const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document ,{
      jsonDocumentUrl: 'api-docs-json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
