import { authConfig } from '@base/config/auth';
import * as jwt from 'jsonwebtoken';

export class JWTProvider {
  public sign(payload: object, dataReturn: object): object {
    return {
      ...dataReturn,
      access_token: jwt.sign(payload, authConfig.jwt.secret, {
        expiresIn: authConfig.jwt.expiresIn
      }),
      expires_in: authConfig.jwt.expiresIn
    };
  }

  public verify(token: string, cb: (err: any, user: any) => void) {
    jwt.verify(token, authConfig.jwt.secret, cb);
  }
}
