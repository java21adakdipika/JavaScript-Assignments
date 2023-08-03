const BaseError = require("./BaseError")

class UnAuthorisedError extends BaseError{
    constructor(specificMessage){
        super(401, "Is Un-Authorised", specificMessage)
    }
}

module.exports = UnAuthorisedError