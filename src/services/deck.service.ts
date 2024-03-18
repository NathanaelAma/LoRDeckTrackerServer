import { CreateDeckDto } from '@/dtos/deck.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Deck } from '@/interfaces/deck.interface';
import { User } from '@/interfaces/users.interface';
import deckModel from '@/models/deck.model';
import userModel from '@/models/users.model';
import { isEmpty } from 'class-validator';
import mongoose from 'mongoose';

class DeckService {
  public decks = deckModel;
  public users = userModel;

  /**
   * Retrieves all decks belonging to a user and throws an error if the user has no decks.
   * @param {User} userData - User object containing user data, such as _id, needed to retrieve decks.
   * @returns {Promise<Deck[]>} Array of `Deck` objects.
   * @throws {HttpException} If `userData` is empty or if the user has no decks.
   */
  public async getAllDecks(userData: User): Promise<Deck[]> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    const user: User = await this.users.findOne({ userId: userData._id });
    const decks: Deck[] = await this.decks.find({
      userId: user._id,
    });
    if (!decks) throw new HttpException(409, 'User has no decks');

    return decks;
  }

  /**
   * Creates a new deck for a user.
   * @param {User} userData - User object containing user data, such as _id, needed to create the deck.
   * @param {string} deckName - Name of the new deck.
   * @param {CreateDeckDto} deckData - Data for the new deck.
   * @returns {Promise<Deck>} The created `Deck` object.
   * @throws {HttpException} If `deckData` is empty or if the user already has a deck with the same name.
   */
  public async createDeck(userData: User, deckName: string, deckData: CreateDeckDto): Promise<Deck> {
    if (isEmpty(deckData)) throw new HttpException(400, 'deckData is empty');
    if (isEmpty(deckName)) throw new HttpException(400, 'deckName is empty');
    const findDeck: Deck = await this.decks.findOne({
      deckName,
    });
    if (findDeck) throw new HttpException(409, `You already have a deck with name ${deckName}`);
    const createdDeckData: Deck = await this.decks.create({
      userId: userData._id,
      deckName,
      encodedDeckString: deckData.encodedDeckString,
    });

    return createdDeckData;
  }

  /**
   * Updates an existing deck for a user.
   * @param {User} userData - User object containing user data, such as _id, needed to update the deck.
   * @param {string} deckId - ID of the deck to be updated.
   * @param {CreateDeckDto} deckData - Updated data for the deck.
   * @returns {Promise<Deck>} The updated `Deck` object.
   * @throws {HttpException} If `deckData` is empty or if the user does not have a deck with the specified ID.
   */
  public async updateDeck(userData: User, deckId: string, deckData: CreateDeckDto): Promise<Deck> {
    if (isEmpty(deckData)) throw new HttpException(400, 'deckData is empty');
    if (isEmpty(deckId)) throw new HttpException(400, 'deckId is empty');
    const findDeck: Deck = await this.decks.findOne({ _id: deckId });
    if (!findDeck) throw new HttpException(409, `You don't have a deck with this id ${deckId}`);
    const updatedDeckData: Deck = await this.decks.findByIdAndUpdate(deckId, { encodedDeckString: deckData.encodedDeckString });
    if (!updatedDeckData) throw new HttpException(409, 'Something went wrong');

    return updatedDeckData;
  }

  /**
   * Deletes a deck for a user.
   * @param {User} userData - User object containing user data, such as _id, needed to delete the deck.
   * @param {string} deckId - ID of the deck to be deleted.
   * @returns {Promise<Deck>} The deleted `Deck` object.
   * @throws {HttpException} If `userData` is empty or if the user does not have a deck with the specified ID.
   */
  public async deleteDeck(userData: User, deckId: string): Promise<Deck> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    if (isEmpty(deckId)) throw new HttpException(400, 'deckId is empty');
    const findDeck: Deck = await this.decks.findOne({ _id: deckId });
    if (!findDeck) throw new HttpException(409, `You don't have a deck with this id ${deckId}`);
    const deletedDeck: Deck = await this.decks.findByIdAndDelete(deckId);
    if (!deletedDeck) throw new HttpException(409, 'Something went wrong');

    return deletedDeck;
  }

  /**
   * Retrieves a deck by its ID.
   * @param {User} userData - User object containing user data, such as _id, needed to retrieve the deck.
   * @param {string} deckId - ID of the deck to be retrieved.
   * @returns {Promise<Deck>} The retrieved `Deck` object.
   * @throws {HttpException} If `userData` is empty or if the user does not have a deck with the specified ID.
   */
  public async getDeckById(userData: User, deckId: string): Promise<Deck> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    const findDeck: Deck = await this.decks.findOne({ _id: new mongoose.Types.ObjectId(deckId) });
    if (!findDeck) throw new HttpException(409, `You don't have a deck with this id ${deckId}`);

    return findDeck;
  }
}

export default DeckService;
