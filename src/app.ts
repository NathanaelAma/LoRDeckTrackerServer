import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { ConnectOptions, connect, set } from 'mongoose';
import * as Sentry from '@sentry/node';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection } from '@database';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import sentryMiddleware from '@/middlewares/sentry.middleware';
import limiterMiddleware from '@/middlewares/ratelimit.middleware';
import { logger, stream } from '@utils/logger';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  /**
   * Represents the main application class.
   */
  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV ?? 'development';
    this.port = PORT ?? 3000;

    this.connectToDatabase();
    this.initializeSentry();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  /**
   * Starts the server and listens for incoming requests on the specified port.
   */
  public listen() {
    this.app.listen(this.port, () => {
      logger.info('=================================');
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info('=================================');
    });
  }

  /**
   * Returns the server instance.
   * @returns {Express.Application} The server instance.
   */
  public getServer() {
    return this.app;
  }

  /**
   * Connects to the database using the specified connection URL and options.
   */
  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    set('strictQuery', true);

    connect(dbConnection.url, dbConnection.options as ConnectOptions);
  }

  /**
   * Initializes the middlewares for the Express application.
   */
  private initializeMiddlewares() {
    if (this.env !== 'test') {
      this.app.use(morgan(LOG_FORMAT, { stream }));
    }
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(limiterMiddleware);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  /**
   * Initializes the routes by adding them to the Express app.
   *
   * @param routes - An array of route objects.
   */
  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  /**
   * Initializes Swagger documentation for the REST API.
   */
  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  /**
   * Initializes the error handling middleware for the application.
   */
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  /**
   * Initializes the Sentry middleware and handlers.
   * Sentry is only initialized if the environment is not 'test'.
   */
  private initializeSentry() {
    if (this.env !== 'test') {
      sentryMiddleware(this);
      this.app.use(Sentry.Handlers.requestHandler());
      this.app.use(Sentry.Handlers.tracingHandler());
    }
  }
}

export default App;
