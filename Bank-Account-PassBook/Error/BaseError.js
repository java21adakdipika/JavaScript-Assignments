

class BaseError extends Error{
    constructor(httpCode, message, specificMessage){
        super(message)
        this.httpCode = httpCode
        this.specificMessage = specificMessage
    }
}

module.exports = BaseError