import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  //Nesse código habilitei o CORS(Cross-Origin Resource Sharing) para possibilitar requisições de diferentes tipos
  app.enableCors({
    origin: 'http://localhost:5173', // Conecta as requisições vindas do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // E os métodos HTTP usados no código
    credentials: true,
  })
  
  await app.listen(3000)
}
bootstrap()
