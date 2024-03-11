import { NextFunction, Request, Response } from 'express';
import DeckService from '@services/deck.service';
import { Deck } from '@/interfaces/deck.interface';
import { CreateDeckDto } from '@/dtos/deck.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';

class DeckController {
  public deckService = new DeckService();

  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await res.status(200).json({ data: 'Hello World', message: 'DeckController' });
    } catch (error) {
      next(error);
    }
  };

  public getAllDecks = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const decks: Deck[] = await this.deckService.getAllDecks(userData);
      res.status(200).json({ data: decks, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createDeck = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const deckData: CreateDeckDto = req.body;
      console.log('createDeck');
      const deckName: string = req.query.name.toString();
      const userData: User = req.user;
      const createdDeckData: Deck = await this.deckService.createDeck(userData, deckName, deckData);
      res.status(201).json({ data: createdDeckData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateDeck = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const deckId: string = req.query.id.toString();
      const deckData: CreateDeckDto = req.body;
      const userData: User = req.user;
      const updatedDeckData: Deck = await this.deckService.updateDeck(userData, deckId, deckData);
      res.status(200).json({ data: updatedDeckData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteDeck = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const deckId: string = req.query.id.toString();
      const userData: User = req.user;
      const deletedDeck: Deck = await this.deckService.deleteDeck(userData, deckId);
      res.status(200).json({ data: deletedDeck, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getDeckById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const deckId: string = req.params.id.toString();
      const userData: User = req.user;
      const findDeck: Deck = await this.deckService.getDeckById(userData, deckId);
      res.status(200).json({ data: findDeck, message: 'findOneById' });
    } catch (error) {
      next(error);
    }
  };

  public getDeckByName = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    console.log('req.params :>> ', req.query);
    try {
      const deckName: string = req.params.name;
      console.log('deckName :>> ', deckName);
      const userData: User = req.user;
      const findDeck: Deck = await this.deckService.getDeckByName(userData, deckName);
      res.status(200).json({ data: findDeck, message: 'findOneByName' });
    } catch (error) {
      next(error);
    }
  };
}

export default DeckController;
