import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import firebaseAdmin from 'firebase-admin';
import { Analytics } from 'firebase/analytics';
import { Auth, getAuth } from 'firebase/auth';
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
import { logger, stream } from '@utils/logger';
import serviceAccount from './../firebase.json';

class App {
  public app: express.Application;
  public firebaseAdmin: firebaseAdmin.app.App;
  public firebaseApp: firebase.FirebaseApp;
  public firebaseAnalitics: Analytics;
  public firebaseAuth: Auth;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeSentry();
    this.initializeFirebase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    connect(dbConnection.url, dbConnection.options as ConnectOptions);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

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

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeSentry() {
    sentryMiddleware(this);
    this.app.use(Sentry.Handlers.requestHandler());
    this.app.use(Sentry.Handlers.tracingHandler());
  }

  private initializeFirebase() {
    const firebaseConfig = {
      apiKey: 'AIzaSyAZGtdvpCcH8fyKtNwE-5Gym6XlKYbFAqs',
      authDomain: 'legends-of-runeterra-tracker.firebaseapp.com',
      databaseURL: 'https://legends-of-runeterra-tracker-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'legends-of-runeterra-tracker',
      storageBucket: 'legends-of-runeterra-tracker.appspot.com',
      messagingSenderId: '891500544313',
      appId: '1:891500544313:web:a2fb411ae9bedb7b25e8e8',
      measurementId: 'G-VKK10JBE7V',
    };

    this.firebaseAdmin = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount as any),
      databaseURL: 'https://legends-of-runeterra-tracker-default-rtdb.europe-west1.firebasedatabase.app',
    });

    this.firebaseApp = initializeApp(firebaseConfig);
    this.firebaseAuth = getAuth(this.firebaseApp);
  }
}

export default App;
