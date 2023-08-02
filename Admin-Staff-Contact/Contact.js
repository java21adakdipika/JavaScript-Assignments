const ContactInfo = require("./ContactInfo")

class Contact {
    static contactID = 0
    constructor(fullname, country){
        this.ID = ++Contact.contactID
        this.fullname = fullname
        this.country = country
        this.contactInfo = []
    }

    updateContact (parameter, newValue){
        switch (parameter){
            case "fullname":
                if (typeof(newValue) != 'string'){
                    return "Invalid Name"
                }
                this.fullname = newValue
                return this
            case "country":
                if (typeof(country) != 'string'){
                    return "Invalid Country"
                }
                this.country = newValue
                return this
            default:
                return "Invalid Parameter"
        }
    }

    newContactInfo(infoType, infoValue){
        let infoObj = new ContactInfo(infoType, infoValue)
        this.contactInfo.push(infoObj)
        return infoObj
    }

    findContactInfo(infoID){
        for (let i=0; i < this.contactInfo.length; i++) {
            if (this.contactInfo[i].ID == infoID){
                return [i, true]
            }
        }
        return [-1, false]
    }

    updateContactInfo(infoID, parameter, value){
        let [index, result] = this.findContactInfo(infoID)
        if (!result){
            return "Information Not Found"
        }
        let info = this.contactInfo[index].updateContactInfo(parameter, value)
        return info
    }

    deleteContactInfo(infoID){
        let [index, result] = this.findContactInfo(infoID)
        if (!result){
            return "Information Not Found"
        }
        let info = this.contactInfo.splice(index, 1)
        return info
    }

    getContactInfoByID(infoID){
        let [index, result] = this.findContactInfo(infoID)
        if (!result){
            return "Information Not Found"
        }
        return this.contactInfo[index]
    }


}

module.exports = Contact

