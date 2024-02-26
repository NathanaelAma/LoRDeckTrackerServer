import App from '@/app';
import { NODE_ENV, SENTRY_DSN } from '@/config';
import * as Sentry from '@sentry/node';
import { browserTracingIntegration } from '@sentry/browser';

const sentryMiddleware = (app: App) => {
  Sentry.init({
    environment: `${NODE_ENV}`,
    release: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
    dsn: SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Mongo({
        useMongoose: true,
      }),
      new Sentry.Integrations.Express({ app: app.getServer() }),
      browserTracingIntegration({
        tracePropagationTargets: ['localhost', /^\//],
      }),
    ],
    tracesSampleRate: 1.0,
  });
};

export default sentryMiddleware;
