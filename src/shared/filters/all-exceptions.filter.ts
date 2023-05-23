import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Catch } from '@nestjs/common/decorators';
import { ExceptionFilter } from '@nestjs/common/interfaces/exceptions';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest<Request>()),
    };

    httpAdapter.reply(ctx.getResponse<Response>(), responseBody, httpStatus);
  }
}
