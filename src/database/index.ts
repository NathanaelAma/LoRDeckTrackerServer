import { DB_HOST, DB_DATABASE } from '@config';

/**
 * Represents the database connection configuration.
 */
export const dbConnection = {
  url: `mongodb+srv://${DB_HOST}/${DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
