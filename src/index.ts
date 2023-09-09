import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { LoggerService } from './logger/logger.service';
import IHelloWorldService from './hello-world/hello-world.service.interface';
import HelloWorldService from './hello-world/hello-world.service';
import { IHelloWorldController } from './hello-world/hello-world.controller.interface';
import { HelloWorldController } from './hello-world/hello-world.controller';
import { App } from './app';
import 'reflect-metadata';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<IConfigService>(TYPES.Config).to(ConfigService).inSingletonScope();
  bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
  bind<IHelloWorldService>(TYPES.HelloWorldService).to(HelloWorldService);
  bind<IHelloWorldController>(TYPES.HelloWorldController).to(
    HelloWorldController,
  );
  bind<App>(TYPES.App).to(App);
});

function bootstrap() {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.App);
  app.init();
}
bootstrap();
