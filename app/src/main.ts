import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('API_PORT');
  await app.listen(port || 3000, () => {
    console.log(`Server: ${port}-portda ishga tushdi`);
  });
}
bootstrap();
