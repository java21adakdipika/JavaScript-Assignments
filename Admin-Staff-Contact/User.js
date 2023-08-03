const Contact = require("./Contact")
const ValidationError = require("./Error/ValidationError")
const UnAuthorisedError = require("./Error/UnAuthorisedError")
const NotFoundError = require("./Error/NotFoundError")

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
        try {
            if (typeof(fname) != 'string'){
                throw new ValidationError("Invalid First Name")
            }
            if (typeof(lname) != 'string'){
                throw new ValidationError("Invalid Last Name")
            }
            if (!(gender == 'M' || gender.toUpperCase() == 'F' || gender.toUpperCase() == 'MALE' || gender.toUpperCase() == 'FEMALE')){
                throw new ValidationError("Invalid Gender")
            }
    
            let fullname = fname + " " + lname
            return new User(fullname, true, gender)
        } catch (error) {
            console.log(error.specificMessage);
        }
        
    }

    newUser(fname, lname, gender){
        try {
            if (typeof(fname) != 'string'){
                throw new ValidationError("Invalid First Name")
            }
            if (typeof(lname) != 'string'){
                throw new ValidationError("Invalid Last Name")
            }
            if (!(gender.toUpperCase() == 'M' || gender.toUpperCase() == 'F' || gender.toUpperCase() == 'MALE' || gender.toUpperCase() == 'FEMALE')){
                throw new ValidationError("Invalid Gender")
            }
            if (!this.isAdmin){
                throw new UnAuthorisedError("Not Admin")
            }
    
            let fullname = fname + " " + lname
            let user = new User(fullname, false, gender)
            User.allUsers.push(user)
            return user
        } catch (error) {
            console.log(error.specificMessage);
        }
        
    }

    getAllUsers(){
        try {
            if (!this.isAdmin){
                throw new UnAuthorisedError("Accesible to Administrators Only")
            }
            return User.allUsers
        } catch (error) {
            console.log(error.specificMessage);
        }
        
    }

    findUser(ID){
        // if (!this.isAdmin){
        //     return "Accessible to Administrators Only"
        // }
        try {
            for (let i=0; i < User.allUsers.length; i++) {
                if (User.allUsers[i].ID == ID){
                    return i
                }
            } 
            throw new NotFoundError("ID not found")
        } catch (error) {
            throw error
        }
    }

    updateUser(ID, parameter, newValue){
        try {
            if (!this.isAdmin){
                throw new UnAuthorisedError("Accesible to Administrators Only")
            }
            let index = this.findUser(ID)
            // if (!result){
            //     return "User Not Found"
            // }
    
            switch (parameter){
                case "fullname":
                    if (typeof(newValue) != 'string'){
                        throw new ValidationError("Invalid Name")
                    }
                    User.allUsers[index].fullname = newValue
                    return User.allUsers[index]
                case "gender":
                    if (!(newValue.toUpperCase() == 'M' && newValue.toUpperCase() != 'F' && newValue.toUpperCase() != 'MALE' && newValue.toUpperCase() != 'FEMALE')){
                        throw new ValidationError("Invalid Gender")
                    }
                    User.allUsers[index].gender = newValue
                    return User.allUsers[index]
                default:
                    throw new ValidationError("Invalid Parameter")
            }   
        } catch (error) {
            console.log(error.specificMessage);
        }
        
        // return User.allUsers[index]
    }

    deleteUser(ID){
        try {
            if (!this.isAdmin){
                throw new UnAuthorisedError("Accesible to Administrators Only")
            }
            let index = this.findUser(ID)
            // if (!result){
            //     return "User Not Found"
            // }
            User.allUsers.splice(index, 1)
            return "User Details Deleted Successfully"
        } catch (error) {
            console.log(error.specificMessage);
        }
        
    }

    newContact(fullname, country){
        try {
            if (typeof(fullname) != 'string'){
                throw new ValidationError("Invalid Fullname")
            }
            if (typeof(country) != 'string'){
                throw new ValidationError("Invalid Country")
            }
            if (this.isAdmin){
                throw new UnAuthorisedError("Only Users can create new contacts")
            }
    
            let userContact = new Contact(fullname, country)
            this.contacts.push(userContact)
            return userContact
        } catch (error) {
            console.log(error.specificMessage);
        }
        
    }

    readContacts(){
        try {
            if (this.isAdmin){
                throw new UnAuthorisedError("Only Users can access contacts")
            }
            return this.contacts
        } catch (error) {
            console.log(error.specificMessage);
        }
        
    }

    findContact(ID){
        try{
            for (let i=0; i < this.contacts.length; i++) {
                if (this.contacts[i].ID == ID){
                    return i
                }
            }
            throw new Error("Contact not Found")
            // return [-1, false]
        }
        catch(error){
            // console.log("I am in catch of findContact");
            throw error
        }
        
    }

    updateContact(ID, parameter, newValue){
        try {
            if (this.isAdmin){
                throw new Error("Only Users can access contacts")
            }
    
            let index = this.findContact(ID)
    
            // if (!result){
            //     return "Contact Not Found"
            // }
    
            let modifiedContact = this.contacts[index].updateContact(parameter, newValue)
            return modifiedContact
            
        } catch (error) {
            console.log(error.specificMessage);
        }
        
    }

    deleteContact(ID){
        try {
            if (this.isAdmin){
                throw new UnAuthorisedError("Only Users can access contacts")
            }
            let index = this.findContact(ID)
            // if (!result){
            //     return "Contact Not Found"
            // }
    
            this.contacts.splice(index, 1)
            return "Contact Deleted Successfully"
        } catch (error) {
            console.log(error.specificMessage);
        }
        
    }

    newContactInfo(ID, infoType, infoValue){
        try {
            if (this.isAdmin){
                throw new UnAuthorisedError("Only Users can access Contacts-Info")
            }

            if (typeof ID != 'number'){
                throw new Error("Provide ID in number")
            }

            let index = this.findContact(ID)
            // if (!result){
            //     return "Contact Not Found"
            // }
            // console.log(index);
    
            let infoObj = this.contacts[index].newContactInfo(infoType, infoValue)
            return infoObj
        } catch (e){
            console.log(e.specificMessage);
        }
       
    }

    getAllInfo(ID){
        try {
            if (this.isAdmin){
                throw new UnAuthorisedError("Only Users can access Contacts-Info")
            }
    
            let index = this.findContact(ID)
            // if (!result){
            //     return "Contact Not Found"
            // }
            return this.contacts[index].contactInfo
        } catch (error) {
            console.log(error.specificMessage);
        }
       
    }

    updateContactInfo(ID, infoID, infoType, infoValue){
        try {
            if (this.isAdmin){
                throw new Error("Only Users can access Contacts-Info")
                // return "Only Users can access Contacts-Info"
            }

            if (typeof ID != 'number' || typeof infoID != 'number'){
                throw new Error("Provide both the IDs in number")
            }
    
            let index = this.findContact(ID)
            // if (!result){
            //     return "Contact Not Found"
            // }
            let info = this.contacts[index].updateContactInfo(infoID, infoType, infoValue)
            return info
        }
        catch (error){
            // console.log("I am in catch of User Class of Update-Contact-Info");
            console.log(error.specificMessage);
        }
        
    }

    deleteContactInfo(ID, infoID){
        try {
            if (this.isAdmin){
                throw new Error("Only Users can access Contacts-Info")
            }
    
            let index = this.findContact(ID)
            // if (!result){
            //     return "Contact Not Found"
            // }
            let info = this.contacts[index].deleteContactInfo(infoID)
            return info
        } catch (error) {
            console.log(error.specificMessage);
        }
       
    }

    getUserByID(userID){
        try {
            if (!this.isAdmin){
                throw new UnAuthorisedError("Accessible to Administrators Only")
            }
            let index = this.findUser(userID)
            // if (!result){
            //     return "User Not Found"
            // }
            return User.allUsers[index]
        } catch (error) {
            console.log(error.specificMessage);
        }
    }

    getContactByID(contactID){
        try {
            if (this.isAdmin){
                throw new UnAuthorisedError("Only Users can access contacts")
            }
    
            let index = this.findContact(contactID)
    
            // if (!result){
            //     return "Contact Not Found"
            // }
            return this.contacts[index]
        } catch (error) {
            console.log(error.specificMessage);
        }
        
    }

    getContactInfoByID(contactID, infoID){
        try {
            if (this.isAdmin){
                throw new UnAuthorisedError("Only Users can access Contacts-Info")
            }
    
            let index = this.findContact(contactID)
            // if (!result){
            //     return "Contact Not Found"
            // }
            let info = this.contacts[index].getContactInfoByID(infoID)
            return info
        } catch (error) {
            console.log(error.specificMessage);
        }
        
    }
}

let adm1 = User.newAdmin("Dipika", "Adak", "F")
// console.log(adm1);

let user1 = adm1.newUser("Siddharth", "Adak", "M") 
// console.log("User 1 info 1: ", user1.newContactInfo(1, "name", "Dipika"));

// console.log(user1);
let user2 = adm1.newUser("Priya", "Agarwal", "F")
let user3 = adm1.newUser("Vedika", "Mishra", "QWERT")  // Error Handling
console.log("All Users: ", adm1.getAllUsers());

let updateuser2 = adm1.updateUser(2, "fullname", "Mahima Tiwari")
let updateuser4 = adm1.updateUser(2, "contact", "Mahima Tiwari") // Error Handling
console.log("All Users: ", adm1.getAllUsers());

let dltuser2 = adm1.deleteUser(2)
let dltuser4 = adm1.deleteUser(4) // Error Handling
console.log("All Users: ", adm1.getAllUsers());

user1.newContact("Mahima", "IND");
user1.newContact("Archana", "USD");
user1.newContact("Shivnath", 101); // Error Handling

console.log("All User Contacts: ", user1.readContacts());
// console.log(adm1.getAllUsers());

console.log("Delete Contact: ", user1.deleteContact(2));
console.log("All Users after Deleting: ", user1.readContacts());

console.log("_________________________________________________________________________");
console.log("User 1 info 1: ", user1.newContactInfo(1, "name", "Dipika"));
console.log("User 1 info 2: ", user1.newContactInfo(1, "number", "345534654"));
console.log("User 1 info 3: ", user1.newContactInfo(1, 789, "developer")); // Error Handling

user1.updateContactInfo(1, 2, "infoType", "hello");
user1.updateContactInfo(1, 2, "infoooo", "Heyya"); // Error Handling
console.log("All info User 1: ",user1.getAllInfo(1));

console.log("Deleted --> ", user1.deleteContactInfo(1, 2));

// console.log("All info:", user1.getAllInfo(1));

console.log(user1.updateContactInfo(1, 1, "infoValue", "Dipali"));
console.log("All info:", user1.getAllInfo(1));

console.log("info by Id", user1.getContactInfoByID(1, 2)); // info not found --> info by id= 2 deleted at line 400
console.log("info by Id", user1.getContactInfoByID(1, 1));

console.log("------------------------------__________________________________________________");
console.log(adm1.getAllUsers());