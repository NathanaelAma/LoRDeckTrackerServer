import App from '@/app';
import { NODE_ENV } from '@/config';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

const sentryMiddleware = (app: App) => {
  Sentry.init({
    environment: NODE_ENV,
    release: process.env.npm_package_name + '@' + process.env.npm_package_version,
    dsn: process.env.SENTRY_DSN,
    integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app: app.getServer() })],
    tracesSampleRate: 1.0,
  });
};

export default sentryMiddleware;
