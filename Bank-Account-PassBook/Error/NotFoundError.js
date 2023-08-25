const BaseError = require("./BaseError")

class NotFoundError extends BaseError{
    constructor(specificMessage){
        super(404, "Not Found", specificMessage)
    }
}

module.exports = NotFoundError