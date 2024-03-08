import { Router } from 'express';
import DeckController from '@controllers/deck.controller';
import { Routes } from '@interfaces/routes.interface';

class DeckRoute implements Routes {
  public path = '/deck';
  public router = Router();

  public deckController = new DeckController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.deckController.index);
  }
}

export default DeckRoute;
