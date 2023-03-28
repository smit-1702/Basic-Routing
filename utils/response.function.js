
const sucessResponse = (data) => {
    return {
        "success": true,
        "data": data
    }
}

const errorResponse = ( error, statusCode = 400) => {
    return {
        statusCode: statusCode,
        success: false,
        error: error
    }
}

module.exports = {
    sucessResponse, errorResponse
}