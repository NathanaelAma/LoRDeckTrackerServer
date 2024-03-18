import App from '@/app';
import { NODE_ENV, SENTRY_DSN } from '@/config';
import * as Sentry from '@sentry/node';
import { BrowserTracing } from '@sentry/tracing';

/**
 * Initializes and configures the Sentry middleware for error tracking and performance monitoring.
 * @param app - The instance of the App class.
 */

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
      new BrowserTracing({
        tracePropagationTargets: ['localhost', /^https:\/\/lor-deck-tracker\.onrender\.com\//],
      }),
    ],
    tracesSampleRate: 1.0,
  });
};

export default sentryMiddleware;
