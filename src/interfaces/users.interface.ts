/**
 * Represents a user in the system.
 */
export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  created_at?: string;
  updated_at?: string;
}
