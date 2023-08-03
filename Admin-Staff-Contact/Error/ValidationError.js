const BaseError = require("./BaseError")

class ValidationError extends BaseError{
    constructor(specificMessage){
        super(400, "Not Found", specificMessage)
    }
}

module.exports = ValidationError