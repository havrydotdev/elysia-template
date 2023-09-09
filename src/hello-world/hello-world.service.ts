import { injectable } from 'inversify';
import IHelloWorldService from './hello-world.service.interface';
import 'reflect-metadata';

@injectable()
export default class HelloWorldService implements IHelloWorldService {
  constructor() {}

  message(): string {
    return 'Hello World';
  }
}
