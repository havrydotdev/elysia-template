import Elysia from 'elysia';
import { ILogger } from './logger/logger.interface';
import { IHelloWorldController } from './hello-world/hello-world.controller.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';
import { IConfigService } from './config/config.service.interface';

@injectable()
export class App {
  app: Elysia;
  port: number;

  constructor(
    @inject(TYPES.Config) private config: IConfigService,
    @inject(TYPES.Logger) private logger: ILogger,
    @inject(TYPES.HelloWorldController)
    private helloWorldController: IHelloWorldController,
  ) {
    this.app = new Elysia();
    this.port = parseInt(this.config.get('PORT')) ?? 3000;
  }

  useRoutes(): void {
    this.app.use(this.helloWorldController.plugin);
  }

  public init(): void {
    this.useRoutes();
    this.logger.log(`[App] Server started on http://localhost:${this.port}`);
    this.app.listen(8080);
  }
}
