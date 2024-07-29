import { QueryFailedError } from 'typeorm';

// Extended interface for error details
export interface ErrorDetails {
  type: 'UniqueConstraintViolation' | 'ForeignKeyViolation' | 'NotFound' | 'GenericError';
  message: string;
}

export function interpretDatabaseError(error: any): ErrorDetails {
  if (error instanceof QueryFailedError) {
    const queryError = error as QueryFailedError & { code?: string; detail?: string; };
    console.log('queryError', queryError);
    switch (queryError.code) {
      case '23505': // Unique violation
        return {
          type: 'UniqueConstraintViolation',
          message: error.message || 'Unique constraint violation.',
        };
      case '23503': // Foreign key violation
        return {
          type: 'ForeignKeyViolation',
          message: error.message || 'Foreign key violation.',
        };
      case '23502': // Not null violation, which might be used as "not found" in some contexts
        return {
          type: 'NotFound',
          message: queryError.message || 'Required field is missing.',
        };
      default:

        return {
          type: 'GenericError',
          message: error.message || 'An error occurred during the query execution.',
        };
    }
  }

  // For non-query related errors or if the error doesn't match the expected types
  return {
    type: 'GenericError',
    message: error.message,
  };
}
