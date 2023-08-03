const ValidationError = require("./Error/ValidationError")

class ContactInfo {
    static infoID = 0
    constructor(infoType, infoValue){
        this.ID = ++ContactInfo.infoID
        this.infoType = infoType
        this.infoValue = infoValue
    }

    updateContactInfo(parameter, newValue){
        try{
            switch (parameter){
                case "infoType":
                    if (typeof(newValue) != 'string'){
                        throw new ValidationError("Invalid Type")
                    }
                    this.infoType = newValue
                    return this
                case "infoValue":
                    if (typeof(newValue) != 'string'){
                        throw new ValidationError("Invalid Type")
                    }
                    this.infoValue = newValue
                    return this
                default:
                    throw new ValidationError("Invalid Parameter")
            }
        } catch (e){
            throw e;
        }
        
    }

    
}

module.exports = ContactInfo