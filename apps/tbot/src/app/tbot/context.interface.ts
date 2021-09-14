import { Scenes } from 'telegraf';

export interface TgContext extends Scenes.SceneContext {
  from: NonNullable<Scenes.SceneContext['from']>;
}
export type TgUser = TgContext['from'];
