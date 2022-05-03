import { env } from '@utils/env';

export const authConfig = {
  jwt: {
    secret: env('JWT_SECRET'),
    expiresIn: env('JWT_EXPIRES_IN')
  },
  defaultDriver: env('AUTH_DEFAULT_DRIVER')
};
