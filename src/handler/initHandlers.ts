import { keyv } from '../database/keyv';
import handlers from '../config/event_handler.json';

export const initHandlers = async () => {
  for (const [key, value] of Object.entries(handlers)) {
    await keyv.set(key, value);
  }
};
