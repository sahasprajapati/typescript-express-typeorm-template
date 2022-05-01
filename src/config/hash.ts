import { env } from '@base/utils/env';

export const hashingConfig = {
  defaultRounds: parseInt(env('HASH_DEFAULT_ROUNDS', '10')),
  defaultDriver: env('HASH_DRIVER', 'bcrypt')
};
