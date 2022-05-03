import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { Response } from 'express';
import { AuthService } from '@infrastructure/services/auth/AuthService';

@Service()
export class AuthCheck implements ExpressMiddlewareInterface {
  constructor(private authService: AuthService) {
    //
  }
  use(request: any, response: Response, next: (err?: any) => any) {
    // throw new Error('Method not implemented.');
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return response
        .status(401)
        .send({ status: 403, message: 'Unauthorized!' });
    }

    const token = authHeader.split(' ')[1];

    this.authService.verify(token, (err, user) => {
      if (err) {
        return response
          .status(403)
          .send({ status: 403, message: 'Forbidden!' });
      }

      request.loggedUser = user;
      next();
    });
  }
}
