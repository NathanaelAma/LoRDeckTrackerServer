import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpException } from '@exceptions/HttpException';

/**
 * Middleware function for validating request data.
 *
 * @param type - The class constructor for the validation target.
 * @param value - The location of the data to be validated (e.g., 'body', 'query', 'params').
 * @param skipMissingProperties - Whether to skip validation for missing properties (default: true).
 * @param whitelist - Whether to only allow properties defined in the validation target (default: true).
 * @param forbidNonWhitelisted - Whether to forbid properties not defined in the validation target (default: true).
 * @returns A RequestHandler function that performs the validation and handles any validation errors.
 */
const validationMiddleware = (
  type: any, // skipcq
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = true,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
