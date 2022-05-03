import { UserRole } from '@api/enums/UserRole.enum';
import { NextFunction, Response } from 'express';

export function HasRole(role: string | string[]): any {
  return function (request: any, response: Response, next: NextFunction) {
    const loggedUser = request.loggedUser;
    let haveAccess = true;

    if (!loggedUser)
      return response
        .status(403)
        .send({ status: 403, message: 'Unauthorized!' });

    if (typeof role == 'string') {
      if (loggedUser.role != role) {
        haveAccess = false;
      }
    } else {
      if (!role.includes(loggedUser.role)) {
        haveAccess = false;
      }
    }

    if (!haveAccess) {
      return response.status(403).send({
        status: 403,
        message: 'User does not have right permission!'
      });
    }
    return next();
  };
}
