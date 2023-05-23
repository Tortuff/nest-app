import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { SubdomainController } from './additional/subdomain/subdomain.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { loggerMiddleware } from './middleware/logger/logger.middleware';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';

@Module({
  imports: [CatsModule],
  controllers: [AppController, SubdomainController],
  providers: [AppService, { provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(loggerMiddleware)
      .exclude({ path: 'cats', method: RequestMethod.POST })
      .forRoutes('cats');
  }
}
