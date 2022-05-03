import { fixModuleAlias } from './utils/fix-module-alias';
fixModuleAlias(__dirname);
import 'reflect-metadata';

import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import Container, { Inject, Service } from 'typedi';
import express from 'express';
import * as path from 'path';
import bodyParser from 'body-parser';
import { loadHelmet } from '@utils/loadHelmet';
import { createServer } from 'http';

import {
  useContainer as useRoutingControllersContainer,
  getMetadataArgsStorage,
  useExpressServer
} from 'routing-controllers';
import { Server as SocketServer } from 'socket.io';

import {
  useSocketServer,
  useContainer as useSocketContainer
} from 'socket-controllers';

import {
  registerController as registerCronJobs,
  useContainer as useCronContainer
} from 'cron-decorators';
import { LoggerService } from '@infrastructure/services/logger/LoggerService';
import { appConfig } from './config/app';
import { dataSource } from './database/data-source';
import { loadEventDispatcher } from '@utils/load-event-dispatcher';

@Service()
export class App {
  private app = express();
  private port = appConfig.appPort;

  @Inject()
  private readonly logger: LoggerService;
  public constructor() {
    this.bootstrap();
  }

  public async bootstrap() {
    this.useContainers();

    await dataSource
      .initialize()
      .then(() => {
        this.logger.info('Successfully initizlied database connection');
      })
      .catch((err: any) => {
        this.logger.error('Error', err);
      });

    // const repo = new UserRepository();
    // this.logger.info(await repo.find());
    //
    this.registerEvents();
    this.registerCronJobs();
    this.serveStaticFiles();
    this.setupMiddlewares();
    // Routes
    this.registerRoutingControllers();
    this.registerSocketController();
    this.registerDefaultHomePage();
    // Swagger
    this.setupSwagger();

    // const dispatcher = new EventDispatcherInterface();
    // dispatcher.dispatch('onUserCreate', { email: 's' });
  }

  private useContainers() {
    // its important to set container before any operation you do with routing-controllers,
    // including importing controllers
    useRoutingControllersContainer(Container);
    useSocketContainer(Container);
    useCronContainer(Container);
  }

  private serveStaticFiles() {
    this.app.use(
      '/public',
      express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
    );
    this.app.use(
      '/chat',
      express.static(path.join(__dirname, 'views/chat'), {
        maxAge: 31557600000
      })
    );
  }

  private setupMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    loadHelmet(this.app);
  }

  private setupSwagger() {
    // Generate a schema
    // Parse class-validator classes into JSON Schema
    const schemas = validationMetadatasToSchemas({
      refPointerPrefix: '#/components/schemas/'
    });
    // Passing routing-controllers classes into OpenAPI spec:
    const storage = getMetadataArgsStorage();

    const spec = routingControllersToSpec(
      storage,
      { routePrefix: appConfig.routePrefix },
      {
        components: {
          schemas,
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
            }
          }
        },
        info: {
          description: 'Welcome to the club!',
          title: 'API Documentation',
          version: '1.0.0',
          contact: {
            name: 'Kutia',
            url: 'https://kutia.net',
            email: 'support@kutia.net'
          }
        }
      }
    );

    // Use swagger
    this.app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
  }

  private registerRoutingControllers() {
    this.app = useExpressServer(this.app, {
      validation: { stopAtFirstError: true },
      cors: false,
      defaultErrorHandler: false, //disable default error handler, only if you have your own errror handler
      routePrefix: appConfig.routePrefix,
      controllers: [__dirname + appConfig.controllerDir],
      middlewares: [__dirname + appConfig.middlewareDir]
    });
  }
  private registerDefaultHomePage() {
    this.app.get('/', (req, res) => {
      res.json({
        title: 'DFS',
        model: 'DEVELOPMENT',
        date: new Date()
      });
    });
  }

  private registerSocketController() {
    const server = createServer(this.app);
    const io = new SocketServer(server);

    this.app.use((req: any, res, next) => {
      req.io = io;
      next();
    });

    server.listen(this.port, () =>
      this.logger.info(`Server started at http://localhost:${this.port}`)
    );

    useSocketServer(io, {
      controllers: [__dirname + appConfig.controllerDir]
    });
  }

  private registerEvents() {
    return loadEventDispatcher();
  }

  private registerCronJobs() {
    // if (false)
    return false;
    registerCronJobs([__dirname + '/api/controllers/**/*.controller{.ts,.js}']);
  }
}

// const app = new App();
Container.get<App>(App);
// dataSource.getRepository(User);

// const app = createExpressServer({
//   controllers: [__dirname + '/api/controllers/**/*.controller{.ts,.js}'],
//   cors: {
//     origin: '*'
//   }
// });

// app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

// app.listen(4000);

// new SendWelcomeMail({ a: 'ol' }).setOptions({ delay: 0 }).dispatch();
