import { model, Schema, Document } from 'mongoose';
import { Deck } from '@interfaces/deck.interface';

const deckSchema: Schema = new Schema({
  userId: {
    type: Object,
    required: true,
  },
  deckName: {
    type: String,
    required: true,
  },
  encodedDeckString: String,
});

const deckModel = model<Deck & Document>('Deck', deckSchema);

export default deckModel;
