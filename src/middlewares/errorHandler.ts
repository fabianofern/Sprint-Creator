import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { error } from '../utils/apiResponse.js';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error Trace:', err);

  // Zod Validation Errors
  if (err instanceof ZodError) {
    return res.status(400).json(
      error('Validation failed', err.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message
      })))
    );
  }

  // Prisma Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        return res.status(409).json(error('Unique constraint violation', err.meta));
      case 'P2025':
        return res.status(404).json(error('Record not found', err.meta));
      default:
        return res.status(400).json(error(`Database error: ${err.message}`));
    }
  }

  // Default Error
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json(error(message));
};
