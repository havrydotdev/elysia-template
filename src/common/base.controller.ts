import Elysia, { Context } from 'elysia';
import { ILogger } from '../logger/logger.interface';
import { IControllerRoute } from './route.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
  private readonly _plugin: Elysia;

  constructor(private logger: ILogger) {
    this._plugin = new Elysia();
  }

  get plugin(): Elysia {
    return this._plugin;
  }

  public send<T>(ctx: Context, message: T, status: number): T {
    ctx.set.headers['Content-Type'] = 'application/json';
    ctx.set.status = status;
    return message;
  }

  public ok<T>(ctx: Context, message: T): T {
    return this.send<T>(ctx, message, 200);
  }

  public unauthorized<T>(ctx: Context, message: T): T {
    return this.send<T>(ctx, message, 401);
  }

  public internalServerError<T>(ctx: Context, message: T): T {
    return this.send<T>(ctx, message, 500);
  }

  public created<T>(ctx: Context, message: T): T {
    return this.send<T>(ctx, message, 201);
  }

  protected bindRoutes(routes: IControllerRoute[]): void {
    for (const route of routes) {
      this.logger.log(`[BaseController] [${route.method}] ${route.path}`);
      this._plugin.route(route.method, route.path, route.func);
    }
  }
}
