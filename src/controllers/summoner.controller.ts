import { NextFunction, Request, Response } from 'express';

class SummonerController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

export default SummonerController;
