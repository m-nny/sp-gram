import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TelegrafException, TelegrafExecutionContext } from 'nestjs-telegraf';
import { TgContext } from '../context.interface';

@Injectable()
export class AdminGuard implements CanActivate {
  private readonly ADMIN_IDS = [467620958];

  canActivate(context: ExecutionContext): boolean {
    const ctx = TelegrafExecutionContext.create(context);
    const { from } = ctx.getContext<TgContext>();

    const isAdmin = this.ADMIN_IDS.includes(from.id);
    if (!isAdmin) {
      throw new TelegrafException(`You're not admin`);
    }
    return true;
  }
}
