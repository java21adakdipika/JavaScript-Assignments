const ContactInfo = require("./ContactInfo")
const NotFoundError = require("./Error/NotFoundError")
const ValidationError = require("./Error/ValidationError")

class Contact {
    static contactID = 0
    constructor(fullname, country){
        this.ID = ++Contact.contactID
        this.fullname = fullname
        this.country = country
        this.contactInfo = []
    }

    updateContact (parameter, newValue){
        try {
            switch (parameter){
                case "fullname":
                    if (typeof(newValue) != 'string'){
                        throw new ValidationError("Invalid Name")
                    }
                    this.fullname = newValue
                    return this
                case "country":
                    if (typeof(country) != 'string'){
                        throw new ValidationError("Invalid Country")
                    }
                    this.country = newValue
                    return this
                default:
                    throw new ValidationError("Invalid Parameter")
            }
        } catch (error) {
            throw error
        }
        
    }

    newContactInfo(infoType, infoValue){
        try {
            if (typeof(infoType) != 'string'){
                throw new ValidationError("Invalid Type")
            }

            if (typeof(infoValue) != 'string'){
                throw new ValidationError("Invalid Type")
            }
            let infoObj = new ContactInfo(infoType, infoValue)
            this.contactInfo.push(infoObj)
            return infoObj
        } catch (error) {
            throw error
        }
        
    }

    findContactInfo(infoID){
        try{
            for (let i=0; i < this.contactInfo.length; i++) {
                if (this.contactInfo[i].ID == infoID){
                    return i
                }
            }
            throw new NotFoundError("Contact-Info does not exist")
        } catch (e){
            // console.log("I am in catch of Find-Contact-Info");
            throw e
        }
        
    }

    updateContactInfo(infoID, parameter, value){
        try{
            let index = this.findContactInfo(infoID)
            // if (!result){
            //     return "Information Not Found"
            // }
            let info = this.contactInfo[index].updateContactInfo(parameter, value)
            return info
        } catch (e){
            // console.log("I am in catch of Contact Class - Update-Contact-Info");
            throw e
            // console.log(e.message);
        }
        
    }

    deleteContactInfo(infoID){
        try {
            let index = this.findContactInfo(infoID)
            // if (!result){
            //     return "Information Not Found"
            // }
            let info = this.contactInfo.splice(index, 1)
            return info
        } catch (error) {
            throw error
        }
        
    }

    getContactInfoByID(infoID){
        try {
            let index = this.findContactInfo(infoID)
            // if (!result){
            //     return "Information Not Found"
            // }
            return this.contactInfo[index]
        } catch (error) {
            throw error
        }
        
    }


}

module.exports = Contact

