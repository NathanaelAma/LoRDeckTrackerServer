import { model, Schema, Document } from 'mongoose';
import { Summoner } from '@interfaces/summoner.interface';

/**
 * Represents a Summoner in the system.
 */
const summonerSchema: Schema = new Schema({
  /**
   * The user ID associated with the summoner.
   */
  userId: {
    type: Object,
    required: true,
  },
  /**
   * The name of the summoner.
   */
  name: {
    type: String,
    required: true,
  },
  /**
   * The account ID of the summoner.
   */
  accountId: {
    type: String,
    required: true,
  },
  /**
   * The PUUID (Player Universally Unique Identifier) of the summoner.
   */
  puuid: {
    type: String,
    required: true,
  },
  /**
   * The profile icon ID of the summoner.
   */
  profileIconId: {
    type: Number,
    required: true,
  },
  /**
   * The revision date of the summoner.
   */
  revisionDate: {
    type: Number,
    required: true,
  },
  /**
   * The summoner level of the summoner.
   */
  summonerLevel: {
    type: Number,
    required: true,
  },
});

/**
 * The Mongoose model for the Summoner schema.
 */
const summonerModel = model<Summoner & Document>('Summoner', summonerSchema);

export default summonerModel;
