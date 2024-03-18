/**
 * Represents a deck in the application.
 */
export interface Deck {
  /**
   * The unique identifier of the deck.
   */
  _id: string;

  /**
   * The user ID associated with the deck.
   */
  userId: string;

  /**
   * The name of the deck.
   */
  deckName: string;

  /**
   * The encoded string representation of the deck.
   */
  encodedDeckString: string;
}
