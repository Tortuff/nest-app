import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): void {
    console.log('==START==');
    console.log('MIDDLEWARE');
    console.log('==END==');
    next();
  }
}

export function loggerMiddleware(req: Request, res: Response, next: VoidFunction): void {
  console.log('==START==');
  console.log('MIDDLEWARE');
  console.log('==END==');
  next();
}
