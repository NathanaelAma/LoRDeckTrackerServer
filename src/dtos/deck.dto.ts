import { IsString } from 'class-validator';

/**
 * Represents the data transfer object for creating a deck.
 */
export class CreateDeckDto {
  /**
   * The encoded string representation of the deck.
   */
  @IsString()
  public encodedDeckString: string;
}
