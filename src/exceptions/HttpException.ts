/**
 * Represents an HTTP exception.
 */
export class HttpException extends Error {
  public status: number;
  public message: string;

  /**
   * Creates a new instance of the HttpException class.
   * @param status The HTTP status code of the exception.
   * @param message The error message of the exception.
   */
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
