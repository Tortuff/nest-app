import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './controllers/cats/cats.controller';
import { SubdomainController } from './controllers/subdomain/subdomain.controller';

@Module({
	imports: [],
	controllers: [AppController, CatsController, SubdomainController],
	providers: [AppService],
})
export class AppModule {}
