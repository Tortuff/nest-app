import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SubdomainController } from './additional/subdomain/subdomain.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { loggerMiddleware } from './middleware/logger/logger.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, CatsModule],
  controllers: [AppController, SubdomainController],
  providers: [AppService], // { provide: APP_FILTER, useClass: AllExceptionsFilter }
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(loggerMiddleware)
      .exclude({ path: 'cats', method: RequestMethod.POST })
      .forRoutes('cats');
  }
}
