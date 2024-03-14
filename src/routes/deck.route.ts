import { Router } from 'express';
import DeckController from '@controllers/deck.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateDeckDto } from '@/dtos/deck.dto';
import authMiddleware from '@/middlewares/auth.middleware';

/**
 * Represents a route for managing decks.
 * @implments {Routes}
 */
class DeckRoute implements Routes {
  public path = '/deck';
  public router = Router();

  public deckController = new DeckController();

  constructor() {
    this.initializeRoutes();
  }

  /**
   * Initializes the routes for the deck management.
   */
  private initializeRoutes() {
    this.router.get(`${this.path}`, this.deckController.index);

    this.router.get(`${this.path}/all`, authMiddleware, this.deckController.getAllDecks);

    this.router.post(`${this.path}/new`, [authMiddleware, validationMiddleware(CreateDeckDto, 'body')], this.deckController.createDeck);

    this.router.patch(`${this.path}/update`, authMiddleware, validationMiddleware(CreateDeckDto, 'body'), this.deckController.updateDeck);

    this.router.delete(`${this.path}/delete`, authMiddleware, this.deckController.deleteDeck);

    this.router.get(`${this.path}/:id`, authMiddleware, this.deckController.getDeckById);

    //this.router.get(`${this.path}/:id/cards`, authMiddleware, this.deckController.getDeckCards);
  }
}

export default DeckRoute;
