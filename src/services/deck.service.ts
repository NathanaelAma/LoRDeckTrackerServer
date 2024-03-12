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

  public async getAllDecks(userData: User): Promise<Deck[]> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    const user: User = await this.users.findOne({ userId: userData._id });
    const decks: Deck[] = await this.decks.find({
      userId: user._id,
    });
    if (!decks) throw new HttpException(409, 'User has no decks');

    return decks;
  }

  public async createDeck(userData: User, deckName: string, deckData: CreateDeckDto): Promise<Deck> {
    if (isEmpty(deckData)) throw new HttpException(400, 'deckData is empty');
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

  public async updateDeck(userData: User, deckId: string, deckData: CreateDeckDto): Promise<Deck> {
    if (isEmpty(deckData)) throw new HttpException(400, 'deckData is empty');
    const findDeck: Deck = await this.decks.findOne({ _id: deckId });
    if (!findDeck) throw new HttpException(409, `You don't have a deck with this id ${deckId}`);
    const updatedDeckData: Deck = await this.decks.findByIdAndUpdate(deckId, { encodedDeckString: deckData.encodedDeckString });
    if (!updatedDeckData) throw new HttpException(409, 'Something went wrong');

    return updatedDeckData;
  }

  public async deleteDeck(userData: User, deckId: string): Promise<Deck> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    const findDeck: Deck = await this.decks.findOne({ _id: deckId });
    if (!findDeck) throw new HttpException(409, `You don't have a deck with this id ${deckId}`);
    const deletedDeck: Deck = await this.decks.findByIdAndDelete(deckId);
    if (!deletedDeck) throw new HttpException(409, 'Something went wrong');

    return deletedDeck;
  }

  public async getDeckById(userData: User, deckId: string): Promise<Deck> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    const findDeck: Deck = await this.decks.findOne({ _id: new mongoose.Types.ObjectId(deckId) });
    if (!findDeck) throw new HttpException(409, `You don't have a deck with this id ${deckId}`);

    return findDeck;
  }

}

export default DeckService;
