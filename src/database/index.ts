import { DB_HOST, DB_DATABASE } from '@config';

export const dbConnection = {
  url: `mongodb+srv://${DB_HOST}/${DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
