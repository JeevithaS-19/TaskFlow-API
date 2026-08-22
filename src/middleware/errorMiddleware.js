const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Mongoose invalid ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid task ID";
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = err.message;
    }

    // Log only unexpected server errors
    if (statusCode >= 500) {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = errorHandler;