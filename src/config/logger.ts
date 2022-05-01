import { env } from '@utils/env';

export const loggerConfig = {
  defaultDriver: env('LOGGER_DRIVER', 'winston')
};
