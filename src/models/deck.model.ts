import { model, Schema, Document } from 'mongoose';
import { Deck } from '@interfaces/deck.interface';

const deckSchema: Schema = new Schema({
  userId: {
    type: Object,
    required: true,
  },
  deckName: {
    type: String,
    required: false,
  },
  cards: [
    {
      cardCode: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      }
    }
  ],
});

const deckModel = model<Deck & Document>('Deck', deckSchema);

export default deckModel;
