export interface Card {
  cardCode: string;
  count: number;
}

export interface Deck {
  _id: string;
  userId?: string;
  deckName: string;
  cards: Card[];
}
