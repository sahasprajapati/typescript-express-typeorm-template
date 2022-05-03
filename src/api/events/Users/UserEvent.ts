import { EventSubscriber, On } from 'event-dispatch';
import { SendWelcomeMail } from '@api/queue-jobs/Users/SendWelcomMail';
import { LoggerService } from '@infrastructure/services/logger/LoggerService';

@EventSubscriber()
export class UserEvent {
  private loggerService: LoggerService;
  constructor() {
    this.loggerService = new LoggerService();
  }
  @On('onUserRegister')
  public onUserRegister(user: any) {
    // console.log("Register")
    this.loggerService.info('Register');
    new SendWelcomeMail(user).setOptions({ delay: 5000 }).dispatch();
  }

  @On('onUserCreate')
  public onUserCreate(user: any) {
    this.loggerService.info('User ' + user.email + ' created!');
  }
}
