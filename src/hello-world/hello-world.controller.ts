import { Context } from 'elysia';
import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { IHelloWorldController } from './hello-world.controller.interface';
import IHelloWorldService from './hello-world.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class HelloWorldController
  extends BaseController
  implements IHelloWorldController
{
  constructor(
    @inject(TYPES.Logger) private loggerService: ILogger,
    @inject(TYPES.HelloWorldService)
    private helloWorldService: IHelloWorldService,
  ) {
    super(loggerService);

    this.bindRoutes([
      {
        path: '/',
        method: 'GET',
        func: this.message.bind(this),
      },
    ]);
  }

  message(ctx: Context): { message: string } {
    this.loggerService.log(
      '[HelloWorldController] [GET]   /hello-world    OK (200)',
    );

    return this.ok<{ message: string }>(ctx, {
      message: this.helloWorldService.message(),
    });
  }
}
