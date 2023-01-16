import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import SummonerRoute from '@routes/summoner.route';
import MatchRoute from '@routes/match.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new SummonerRoute(), new MatchRoute()]);

app.listen();
