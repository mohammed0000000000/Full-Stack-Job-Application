const {StatusCodes} = require("http-status-codes");
const CustomAPIError = require("../errors/custom-api-error");

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    }

    if (err.name === 'ValidationError') {
        // const {error} = err.errors;
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.msg = Object.values(err.errors).map((item) => item.message).join(", ");
    }

    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, Please Provide A unique ${Object.values(err.keyValue)}`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    if (err.name === "CastError") {
        customError.statusCode = StatusCodes.NOT_FOUND;
        customError.msg = `No Item found with id ${err.value}`
    }
    return res.status(customError.statusCode).json({msg: customError.msg});
}

module.exports = errorHandlerMiddleware;