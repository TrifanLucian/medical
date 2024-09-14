"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpretDatabaseError = void 0;
const typeorm_1 = require("typeorm");
function interpretDatabaseError(error) {
    if (error instanceof typeorm_1.QueryFailedError) {
        const queryError = error;
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
exports.interpretDatabaseError = interpretDatabaseError;
//# sourceMappingURL=interpretDatabaseError.js.map