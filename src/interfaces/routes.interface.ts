import { Router } from 'express';

/**
 * Represents a route in the application.
 */
export interface Routes {
  /**
   * The path of the route.
   */
  path?: string;

  /**
   * The router object that handles the route.
   */
  router: Router;
}
