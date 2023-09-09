import { ElysiaInstance, HTTPMethod, Handler } from 'elysia';

export interface IControllerRoute {
  path: string;
  func: Handler<any, ElysiaInstance>;
  method: HTTPMethod;
}
