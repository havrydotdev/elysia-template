import { ElysiaInstance, Handler } from 'elysia';
import { BaseController } from '../common/base.controller';

export interface IHelloWorldController extends BaseController {
  message: Handler<any, ElysiaInstance>;
}
