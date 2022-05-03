import { LoggerService } from '@infrastructure/services/logger/LoggerService';
import {
  ConnectedSocket,
  MessageBody,
  OnConnect,
  OnDisconnect,
  OnMessage,
  SocketController,
  SocketIO
} from 'socket-controllers';
import { Service } from 'typedi';

@Service()
@SocketController()
export class ChatSocketController {
  constructor(private loggerService: LoggerService) {}
  @OnConnect()
  connection(@ConnectedSocket() socket: any) {
    this.loggerService.info('Client connected');
  }

  @OnDisconnect()
  disconnect(@ConnectedSocket() socket: any) {
    this.loggerService.info('Client disconnected');
  }

  @OnMessage('save-message')
  save(@SocketIO() socket: any, @MessageBody() message: any) {
    this.loggerService.info('Received message:', message);
    this.loggerService.info(
      'Setting id to message and sending it back to client'
    );
    message.id = 1;

    socket.emit('message-saved', message);
  }
}
