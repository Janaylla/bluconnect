import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  const port = process.env.BACKEND_PORT;
  await app
    .listen(port)
    .then(() => console.log(`Server is running on http://localhost:${port}`));
}
bootstrap();
