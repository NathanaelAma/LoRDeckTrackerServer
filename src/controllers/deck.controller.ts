import { NextFunction, Request, Response } from 'express';
import DeckService from '@services/deck.service';
import { Deck } from '@/interfaces/deck.interface';
import { CreateDeckDto } from '@/dtos/deck.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';

/**
 * Controller for managing decks.
 */
class DeckController {
  public deckService = new DeckService();

  /**
   * Get all decks.
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function.
   */
  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await res.status(200).json({ data: 'Hello World', message: 'DeckController' });
    } catch (error) {
      next(error); // skipcq
    }
  };

  /**
   * Get all decks for a specific user.
   * @param req - The request object with user information.
   * @param res - The response object.
   * @param next - The next function.
   */
  public getAllDecks = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const decks: Deck[] = await this.deckService.getAllDecks(userData);
      res.status(200).json({ data: decks, message: 'findAll' });
    } catch (error) {
      next(error); // skipcq
    }
  };

  /**
   * Create a new deck.
   * @param req - The request object with user and deck data.
   * @param res - The response object.
   * @param next - The next function.
   */
  public createDeck = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const deckData: CreateDeckDto = req.body;
      const deckName: string = req.query.name.toString();
      const userData: User = req.user;
      const createdDeckData: Deck = await this.deckService.createDeck(userData, deckName, deckData);
      res.status(201).json({ data: createdDeckData, message: 'created' });
    } catch (error) {
      next(error); // skipcq
    }
  };

  /**
   * Update a deck.
   * @param req - The request object with user, deck ID, and updated deck data.
   * @param res - The response object.
   * @param next - The next function.
   */
  public updateDeck = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const deckId: string = req.query.id.toString();
      const deckData: CreateDeckDto = req.body;
      const userData: User = req.user;
      const updatedDeckData: Deck = await this.deckService.updateDeck(userData, deckId, deckData);
      res.status(200).json({ data: updatedDeckData, message: 'updated' });
    } catch (error) {
      next(error); // skipcq
    }
  };

  /**
   * Delete a deck.
   * @param req - The request object with user and deck ID.
   * @param res - The response object.
   * @param next - The next function.
   */
  public deleteDeck = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const deckId: string = req.query.id.toString();
      const userData: User = req.user;
      const deletedDeck: Deck = await this.deckService.deleteDeck(userData, deckId);
      res.status(200).json({ data: deletedDeck, message: 'deleted' });
    } catch (error) {
      next(error); // skipcq
    }
  };

  /**
   * Get a deck by ID.
   * @param req - The request object with user and deck ID.
   * @param res - The response object.
   * @param next - The next function.
   */
  public getDeckById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const deckId: string = req.params.id.toString();
      const userData: User = req.user;
      const findDeck: Deck = await this.deckService.getDeckById(userData, deckId);
      res.status(200).json({ data: findDeck, message: 'findOneById' });
    } catch (error) {
      next(error); // skipcq
    }
  };
}

export default DeckController;
