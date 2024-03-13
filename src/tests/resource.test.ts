import request from 'supertest';
import mongoose from 'mongoose';
import App from '@/app';
import ResourceRoute from '@routes/resource.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

const version = 'latest';
const locale = 'en_us';
const lorRegion = 'noxus';
const lorSet = 1;
const cardId = '01IO012';

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      const resourceRoute = new ResourceRoute();
      const app = new App([resourceRoute]);

      return request(app.getServer()).get(`${resourceRoute.path}`).expect(200);
    });
  });
});

describe('Testing Bundle', () => {
  describe('[GET] /resource/bundle/?version=${version}&locale=${locale}', () => {
    it('response statusCode 200', () => {
      const resourceRoute = new ResourceRoute();
      const app = new App([resourceRoute]);

      return request(app.getServer()).get(`${resourceRoute.path}/bundle?version=${version}&locale=${locale}`).expect(200);
    });
    describe('[GET] /resource/bundle/?version=&locale=${locale}', () => {
      it('response statusCode 400', () => {
        const resourceRoute = new ResourceRoute();
        const app = new App([resourceRoute]);

        return request(app.getServer()).get(`${resourceRoute.path}/bundle?version=&locale=${locale}`).expect(400);
      });
    });
    describe('[GET] /resource/bundle/?version=${version}&locale=', () => {
      it('response statusCode 400', () => {
        const resourceRoute = new ResourceRoute();
        const app = new App([resourceRoute]);

        return request(app.getServer()).get(`${resourceRoute.path}/bundle?version=${version}&locale=`).expect(400);
      });
    });
  });
});

describe('Testing Set', () => {
  describe('[GET] /resource/set?version=${version}&locale=${locale}&lorSet=${lorSet}', () => {
    it('response statusCode 200', () => {
      const resourceRoute = new ResourceRoute();
      const app = new App([resourceRoute]);

      return request(app.getServer()).get(`${resourceRoute.path}/set?version=${version}&locale=${locale}&lorSet=${lorSet}`).expect(200);
    });
    describe('[GET] /resource/set?version=&locale=${locale}&lorSet=${lorSet}', () => {
      it('response statusCode 400', () => {
        const resourceRoute = new ResourceRoute();
        const app = new App([resourceRoute]);

        return request(app.getServer()).get(`${resourceRoute.path}/set?version=&locale=${locale}&lorSet=${lorSet}`).expect(400);
      });
    });
    describe('[GET] /resource/set?version=${version}&locale=&lorSet=${lorSet}', () => {
      it('response statusCode 400', () => {
        const resourceRoute = new ResourceRoute();
        const app = new App([resourceRoute]);

        return request(app.getServer()).get(`${resourceRoute.path}/set?version=${version}&locale=&lorSet=${lorSet}`).expect(400);
      });
    });
    describe('[GET] /resource/set?version=${version}&locale=${locale}&lorSet=', () => {
      it('response statusCode 500', () => {
        const resourceRoute = new ResourceRoute();
        const app = new App([resourceRoute]);

        return request(app.getServer()).get(`${resourceRoute.path}/set?version=${version}&locale=${locale}&lorSet=${'99'}`).expect(500);
      });
    });
  });
});

describe('Testing regionIcon', () => {
  describe('[GET] /resource/regionIcon.png?version=${version}&locale=${locale}&region=${lorRegion}', () => {
    it('response statusCode 200', () => {
      const resourceRoute = new ResourceRoute();
      const app = new App([resourceRoute]);

      return request(app.getServer()).get(`${resourceRoute.path}/regionIcon.png?version=${version}&locale=${locale}&region=${lorRegion}`).expect(200);
    });
    describe('[GET] /resource/regionIcon.png?version=&locale=${locale}&region=${lorRegion}', () => {
      it('response statusCode 400', () => {
        const resourceRoute = new ResourceRoute();
        const app = new App([resourceRoute]);

        return request(app.getServer()).get(`${resourceRoute.path}/regionIcon.png?version=&locale=${locale}&region=${lorRegion}`).expect(400);
      });
    });
    describe('[GET] /resource/regionIcon.png?version=${version}&locale=&region=${lorRegion}', () => {
      it('response statusCode 400', () => {
        const resourceRoute = new ResourceRoute();
        const app = new App([resourceRoute]);

        return request(app.getServer()).get(`${resourceRoute.path}/regionIcon.png?version=${version}&locale=&region=${lorRegion}`).expect(400);
      });
    });
    describe('[GET] /resource/regionIcon.png?version=${version}&locale=${locale}&region=', () => {
      it('response statusCode 400', () => {
        const resourceRoute = new ResourceRoute();
        const app = new App([resourceRoute]);

        return request(app.getServer()).get(`${resourceRoute.path}/regionIcon.png?version=${version}&locale=${locale}&region=`).expect(400);
      });
    });
  });
});

describe('Testing card', () => {
  describe('[GET] /resource/card?version=${version}&locale=${locale}&lorSet=${lorSet}&cardId=${cardId}', () => {
    it('response statusCode 200', () => {
      const resourceRoute = new ResourceRoute();
      const app = new App([resourceRoute]);

      return request(app.getServer())
        .get(`${resourceRoute.path}/card?version=${version}&locale=${locale}&lorSet=${lorSet}&cardId=${cardId}`)
        .expect(200);
    });
    describe('[GET] /resource/card?version=&locale=en_us&lorSet=1&cardId=01IO012', () => {
      it('response statusCode 400', () => {
        const resourceRoute = new ResourceRoute();
        const app = new App([resourceRoute]);

        return request(app.getServer()).get(`${resourceRoute.path}/card?version=&locale=${locale}&lorSet=${lorSet}&cardId=${cardId}`).expect(400);
      });
    });
    describe('[GET] /resource/card?version=${version}&locale=&lorSet=${lorSet}&cardId=${cardId}', () => {
      it('response statusCode 400', () => {
        const resourceRoute = new ResourceRoute();
        const app = new App([resourceRoute]);

        return request(app.getServer()).get(`${resourceRoute.path}/card?version=${version}&locale=&lorSet=${lorSet}&cardId=${cardId}`).expect(400);
      });
    });
    describe('[GET] /resource/card?version=${version}&locale=${locale}&lorSet=&cardId=${cardId}', () => {
      it('response statusCode 500', () => {
        const resourceRoute = new ResourceRoute();
        const app = new App([resourceRoute]);

        return request(app.getServer()).get(`${resourceRoute.path}/card?version=${version}&locale=${locale}&lorSet=&cardId=${cardId}`).expect(500);
      });
    });

    describe('[GET] /resource/card?version=${version}&locale=${locale}&lorSet=${lorSet}&cardId=', () => {
      it('response statusCode 400', () => {
        const resourceRoute = new ResourceRoute();
        const app = new App([resourceRoute]);

        return request(app.getServer()).get(`${resourceRoute.path}/card?version=${version}&locale=${locale}&lorSet=${lorSet}&cardId=`).expect(400);
      });
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
