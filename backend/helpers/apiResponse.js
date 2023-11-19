/**
 * 
 * @param {Object} res - The response object that is sent to client.
 * @param {Number} statusCode - The http statusCode in response to the clinet's request.
 * @param {Boolean} success - The message which indicates whether the request is successful or not.
 * @param {Object} data - The data client requested.
 * @param {String} message - A message sent to the client.
 * @param {Object} error - An error sent to the client.
 */
const responseData = (res, statusCode, success, data, message, error)=>{
    const apiResponse={
        success: success,
        data: data,
        message: message
        
    }
    return res.status(statusCode).json(apiResponse);
}

module.exports = responseData