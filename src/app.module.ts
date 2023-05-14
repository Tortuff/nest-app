import { Module } from '@nestjs/common';
import { SubdomainController } from './additional/subdomain/subdomain.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [AppController, SubdomainController],
  providers: [AppService],
})
export class AppModule {}
