exports.UnauthorizedMessage = () => {
    return {
        status: 401,
        response: "Unauthorized request..."
    };
};

exports.UnauthorizedCustomMessage = (message) => {
    return {
        status: 401,
        response: message
    };
};