import { InternalServerError } from 'routing-controllers';

export class RegisterFailedException extends InternalServerError {
  constructor() {
    super('Register Failed!');
  }
}
