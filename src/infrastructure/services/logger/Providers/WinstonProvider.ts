import { createLogger, transports, format } from 'winston';

export class WinstonProvider {
  private logger;

  constructor() {
    this.logger = createLogger({
      transports: [
        new transports.Console({}),
        new transports.File({
          dirname: 'logs',
          filename: 'error.log',
          level: 'error',
          format: format.combine(format.uncolorize(), format.json())
        } as transports.FileTransportOptions),
        new transports.File({
          dirname: 'logs',
          filename: 'info.log',
          level: 'info',
          format: format.combine(format.uncolorize(), format.json())
        } as transports.FileTransportOptions)
      ],
      format: format.combine(
        format((info: any) => {
          info.level = info.level.toUpperCase();
          return info;
        })(),
        format.colorize({ all: true }),
        format.metadata(),
        format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        format.printf(({ timestamp, level, message, metadata }: any) => {
          return ` [${level}]: ${timestamp} : ${message}. ${
            Object.keys(metadata).length === 0
              ? ''
              : JSON.stringify({ ...metadata })
          }`;
        })
      )
    });
  }

  public info(message: string, ...meta: any[]) {
    this.logger.info(message, ...meta);
  }
  public warn(message: string, ...meta: any[]) {
    this.logger.warn(message, ...meta);
  }
  public error(message: string, ...meta: any[]) {
    this.logger.error(message, ...meta);
  }
}
