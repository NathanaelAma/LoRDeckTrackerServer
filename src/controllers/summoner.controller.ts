import { NextFunction, Request, Response } from 'express';
class SummonerController {
  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: 'Hello World', message: 'SummonerController' });
    } catch (error) {
      next(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public getSummoner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {};
}

export default SummonerController;
