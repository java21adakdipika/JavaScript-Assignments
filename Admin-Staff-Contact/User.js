const Contact = require("./Contact")

class User {
    static allUsers = []
    static userID = 0
    constructor(fullname, isAdmin, gender){
        this.ID = User.userID++
        this.fullname = fullname
        this.gender = gender
        this.isAdmin = isAdmin
        this.contacts = []
    }

    static newAdmin(fname, lname, gender){
        if (typeof(fname) != 'string'){
            return "Invalid First Name"
        }
        if (typeof(lname) != 'string'){
            return "Invalid Last Name"
        }
        if (gender != 'M' && gender != 'F' && gender.toUpperCase() != 'MALE' && gender.toUpperCase() != 'FEMALE'){
            return "Invalid Gender"
        }

        let fullname = fname + " " + lname
        return new User(fullname, true, gender)
    }

    newUser(fname, lname, gender){
        if (typeof(fname) != 'string'){
            return "Invalid First Name"
        }
        if (typeof(lname) != 'string'){
            return "Invalid Last Name"
        }
        if (gender != 'M' && gender != 'F' && gender.toUpperCase() != 'MALE' && gender.toUpperCase() != 'FEMALE'){
            return "Invalid Gender"
        }
        if (!this.isAdmin){
            return "Not Admin"
        }

        let fullname = fname + " " + lname
        let user = new User(fullname, false, gender)
        User.allUsers.push(user)
        return user
    }

    getAllUsers(){
        if (!this.isAdmin){
            return "Accesible to Administrators Only"
        }
        return User.allUsers
    }

    findUser(ID){
        // if (!this.isAdmin){
        //     return "Accessible to Administrators Only"
        // }
        for (let i=0; i < User.allUsers.length; i++) {
            if (User.allUsers[i].ID == ID){
                return [i, true]
            }
        }
        return [-1, false]
    }

    updateUser(ID, parameter, newValue){
        if (!this.isAdmin){
            return "Accessible to Administrators Only"
        }
        let [index, result] = this.findUser(ID)
        if (!result){
            return "User Not Found"
        }

        switch (parameter){
            case "fullname":
                if (typeof(newValue) != 'string'){
                    return "Invalid Name"
                }
                User.allUsers[index].fullname = newValue
                return User.allUsers[index]
            case "gender":
                if (newValue != 'M' && newValue != 'F' && newValue.toUpperCase() != 'MALE' && newValue.toUpperCase() != 'FEMALE'){
                    return "Invalid Gender"
                }
                User.allUsers[index].gender = newValue
                return User.allUsers[index]
            default:
                return "Invalid Parameter"
        }
        // return User.allUsers[index]
    }

    deleteUser(ID){
        if (!this.isAdmin){
            return "Accessible to Administrators Only"
        }
        let [index, result] = this.findUser(ID)
        if (!result){
            return "User Not Found"
        }

        User.allUsers.splice(index, 1)
        return "User Details Deleted Successfully"
    }

    newContact(fullname, country){
        if (typeof(fullname) != 'string'){
            return "Invalid Fullname"
        }
        if (typeof(country) != 'string'){
            return "Invalid Country"
        }
        if (this.isAdmin){
            return "Only Users can create new contacts"
        }

        let userContact = new Contact(fullname, country)
        this.contacts.push(userContact)
        return userContact
    }

    readContacts(){
        if (this.isAdmin){
            return "Only Users can access contacts"
        }
        return this.contacts
    }

    findContact(ID){
        for (let i=0; i < this.contacts.length; i++) {
            if (this.contacts[i].ID == ID){
                return [i, true]
            }
        }
        return [-1, false]
    }

    updateContact(ID, parameter, newValue){
        if (this.isAdmin){
            return "Only Users can access contacts"
        }

        let [index, result] = this.findContact(ID)

        if (!result){
            return "Contact Not Found"
        }

        let modifiedContact = this.contacts[index].updateContact(parameter, newValue)
        return modifiedContact
    }

    deleteContact(ID){
        if (this.isAdmin){
            return "Only Users can access contacts"
        }
        let [index, result] = this.findContact(ID)
        if (!result){
            return "Contact Not Found"
        }

        this.contacts.splice(index, 1)
        return "Contact Deleted Successfully"
    }

    newContactInfo(ID, infoType, infoValue){
        if (this.isAdmin){
            return "Only Users can access Contacts-Info"
        }

        let [index, result] = this.findContact(ID)
        if (!result){
            return "Contact Not Found"
        }

        let infoObj = this.contacts[index].newContactInfo(infoType, infoValue)
        return infoObj
    }

    getAllInfo(ID){
        if (this.isAdmin){
            return "Only Users can access Contacts-Info"
        }

        let [index, result] = this.findContact(ID)
        if (!result){
            return "Contact Not Found"
        }
        return this.contacts[index].contactInfo
    }

    updateContactInfo(ID, infoID, infoType, infoValue){
        if (this.isAdmin){
            return "Only Users can access Contacts-Info"
        }

        let [index, result] = this.findContact(ID)
        if (!result){
            return "Contact Not Found"
        }
        let info = this.contacts[index].updateContactInfo(infoID, infoType, infoValue)
        return info
    }

    deleteContactInfo(ID, infoID){
        if (this.isAdmin){
            return "Only Users can access Contacts-Info"
        }

        let [index, result] = this.findContact(ID)
        if (!result){
            return "Contact Not Found"
        }
        let info = this.contacts[index].deleteContactInfo(infoID)
        return info
    }

    getUserByID(userID){
        if (!this.isAdmin){
            return "Accessible to Administrators Only"
        }
        let [index, result] = this.findUser(userID)
        if (!result){
            return "User Not Found"
        }
        return User.allUsers[index]
    }

    getContactByID(contactID){
        if (this.isAdmin){
            return "Only Users can access contacts"
        }

        let [index, result] = this.findContact(contactID)

        if (!result){
            return "Contact Not Found"
        }
        return this.contacts[index]
    }

    getContactInfoByID(contactID, infoID){
        if (this.isAdmin){
            return "Only Users can access Contacts-Info"
        }

        let [index, result] = this.findContact(contactID)
        if (!result){
            return "Contact Not Found"
        }
        let info = this.contacts[index].getContactInfoByID(infoID)
        return info
    }
}

let adm1 = User.newAdmin("Dipika", "Adak", "F")

let user1 = adm1.newUser("Siddharth", "Adak", "M")
let user2 = adm1.newUser("Vedika", "Mishra", "F")
let user3 = adm1.newUser("Priya", "Agarwal", "F")
// console.log(adm1);
// console.log(adduser1);
console.log(adm1.getAllUsers());

// let updateuser1 = adm1.updateUser(2, "fullname", "Priya Mishra")
// console.log(updateuser1);

let deleteuser1 = adm1.deleteUser(2)
console.log(deleteuser1);

console.log(adm1.getAllUsers());

console.log(user1.newContact("Mahima", "IND"));
console.log(user1.newContact("Archana", "USD"));
console.log(user1.newContact("Shivnath", "IND"));

console.log("All Users: ", user1.readContacts());
console.log("Delete Contact: ", user1.deleteContact(2));
console.log("All Users after Deleting: ", user1.readContacts());


console.log("_____________________________");
console.log("INdex 1 info: ", user1.newContactInfo("1", "name", "Dipika"));
console.log("INdex 1 info: ", user1.newContactInfo("1", "number", "345534654"));
console.log("INdex 1 info: ", user1.newContactInfo("1", "role", "developer"));

console.log("All info:", user1.getAllInfo(1));
console.log(user1.updateContactInfo(1, 2, "infoValue", "Dipali"));


console.log("Deleted --> ", user1.deleteContactInfo(1, 2));
console.log("All info:",user1.getAllInfo(1));

console.log("info by Id", user1.getContactInfoByID(1, 2)); // info not found --> info by id= 2 deleted at line 294
console.log("info by Id", user1.getContactInfoByID(1, 1));

console.log("------------------------------");
console.log(adm1.getAllUsers());