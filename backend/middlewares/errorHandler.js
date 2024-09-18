import { ApiError } from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        // If the error is an instance of ApiError, respond with its details
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
        });
    }

    // For all other errors, respond with a generic error message
    console.error(err);
    return res.status(500).json({
        success: false,
        message: 'Internal server error',
    });
};

export default errorHandler;
