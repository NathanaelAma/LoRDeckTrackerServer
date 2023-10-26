import { model, Schema, Document } from 'mongoose';
import { Summoner } from '@interfaces/summoner.interface';

const summonerSchema: Schema = new Schema({
  userId: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  accountId: {
    type: String,
    required: true,
  },
  puuid: {
    type: String,
    required: true,
  },
  profileIconId: {
    type: Number,
    required: true,
  },
  revisionDate: {
    type: Number,
    required: true,
  },
  summonerLevel: {
    type: Number,
    required: true,
  },
});

const summonerModel = model<Summoner & Document>('Summoner', summonerSchema);

export default summonerModel;
