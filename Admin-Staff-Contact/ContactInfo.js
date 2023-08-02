
class ContactInfo {
    static infoID = 0
    constructor(infoType, infoValue){
        this.ID = ContactInfo.infoID++
        this.infoType = infoType
        this.infoValue = infoValue
    }

    updateContactInfo(parameter, newValue){
        switch (parameter){
            case "infoType":
                if (typeof(newValue) != 'string'){
                    return "Invalid Type"
                }
                this.infoType = newValue
                return this
            case "infoValue":
                if (typeof(newValue) != 'string'){
                    return "Invalid Type"
                }
                this.infoValue = newValue
                return this
            default:
                return "Invalid Parameter"
        }
    }

    
}

module.exports = ContactInfo