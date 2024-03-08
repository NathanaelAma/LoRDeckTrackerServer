import { NextFunction, Request, Response } from 'express';
import DeckService from '@services/deck.service';

class DeckController{

  public deckService = new DeckService();

  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await res.status(200).json({ data: 'Hello World', message: 'DeckController' });
    } catch (error) {
      next(error);
    }
  };
}

export default DeckController;
