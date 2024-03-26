import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

/**
 * Represents a user in the application.
 */
const userSchema: Schema = new Schema({
  /**
   * The username of the user.
   */
  username: {
    type: String,
    required: true,
    unique: true,
  },
  /**
   * The email address of the user.
   */
  email: {
    type: String,
    required: true,
    unique: true,
  },
  /**
   * The password of the user.
   */
  password: {
    type: String,
    required: true,
  },

  created_at: {
    type: String,
    required: false,
  },

  updated_at: {
    type: String,
    required: false,
  },
});

/**
 * The Mongoose model for the User schema.
 */
const userModel = model<User & Document>('User', userSchema);

export default userModel;
