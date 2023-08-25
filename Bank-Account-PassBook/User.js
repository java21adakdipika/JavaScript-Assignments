const Bank = require("./Bank")
const Account = require("./Account")
const ValidationError = require("./Error/ValidationError")
const UnAuthorisedError = require("./Error/UnAuthorisedError")
const NotFoundError = require("./Error/NotFoundError")

class User {
    static allCustomers = []
    static userID = 0
    constructor(fullname, isAdmin, gender) {
        this.ID = User.userID++
        this.fullname = fullname
        this.gender = gender
        this.isAdmin = isAdmin
        this.allUserAccounts = []
    }

    static newAdmin(fullname, gender) {
        try {
            if (typeof (fullname) != 'string') {
                throw new ValidationError("Invalid Full Name")
            }
            if (!(gender == 'M' || gender.toUpperCase() == 'F' || gender.toUpperCase() == 'MALE' || gender.toUpperCase() == 'FEMALE')) {
                throw new ValidationError("Invalid Gender")
            }

            return new User(fullname, true, gender)
        } catch (error) {
            console.log(error.specificMessage);
        }

    }

    newCustomer(fullname, gender) {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorisedError("Not Admin")
            }
            if (typeof (fullname) != 'string') {
                throw new ValidationError("Invalid First Name")
            }
            if (!(gender.toUpperCase() == 'M' || gender.toUpperCase() == 'F' || gender.toUpperCase() == 'MALE' || gender.toUpperCase() == 'FEMALE')) {
                throw new ValidationError("Invalid Gender")
            }

            let user = new User(fullname, false, gender)
            User.allCustomers.push(user)
            return user
        } catch (error) {
            console.log(error.specificMessage);
        }

    }

    getAllCustomers() {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorisedError("Accesible to Administrators Only")
            }
            return User.allCustomers
        } catch (error) {
            console.log(error.specificMessage);
        }
    }

    findCustomer(ID) {
        try {
            for (let i = 0; i < User.allCustomers.length; i++) {
                if (User.allCustomers[i].ID == ID) {
                    return i
                }
            }
            throw new NotFoundError("ID not found")
        } catch (error) {
            throw error
        }
    }

    updateCustomer(ID, parameter, newValue) {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorisedError("Accesible to Administrators Only")
            }
            if (typeof (ID) != 'number') {
                throw new ValidationError("ID should be number")
            }
            let index = this.findCustomer(ID)

            switch (parameter) {
                case "fullname":
                    if (typeof (newValue) != 'string') {
                        throw new ValidationError("Invalid Name")
                    }
                    User.allCustomers[index].fullname = newValue
                    return User.allCustomers[index]
                case "gender":
                    if (!(newValue.toUpperCase() == 'M' && newValue.toUpperCase() != 'F' && newValue.toUpperCase() != 'MALE' && newValue.toUpperCase() != 'FEMALE')) {
                        throw new ValidationError("Invalid Gender")
                    }
                    User.allCustomers[index].gender = newValue
                    return User.allCustomers[index]
                default:
                    throw new ValidationError("Invalid Parameter")
            }
        } catch (error) {
            console.log(error.specificMessage);
        }
        // return User.allUsers[index]
    }

    deleteCustomer(ID) {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorisedError("Accesible to Administrators Only")
            }
            if (typeof (ID) != 'number') {
                throw new ValidationError("ID should be number")
            }
            let index = this.findCustomer(ID)
            User.allCustomers.splice(index, 1)
            return "Customers Details Deleted Successfully"
        } catch (error) {
            console.log(error.specificMessage);
        }
    }

    newBank(bankName) {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorisedError("Not Admin")
            }
            if (typeof (bankName) != 'string') {
                throw new ValidationError("Invalid Bank Name")
            }

            let bank = new Bank(bankName)
            // User.allBanks.push(bank)
            Bank.addBank(bank)
            return bank
        } catch (error) {
            console.log(error.specificMessage);
        }
    }

    getAllBanks() {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorisedError("Accesible to Administrators Only")
            }
            return Bank.allBanks
        } catch (error) {
            console.log(error.specificMessage);
        }
    }

    updateBank(ID, parameter, newValue) {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorisedError("Accesible to Administrators Only")
            }
            if (typeof (ID) != 'number') {
                throw new ValidationError("ID should be number")
            }
            let index = this.findBank(ID)
            let bankObj = Bank.allBanks[index].updateBank(parameter, newValue)
            return bankObj
        } catch (error) {
            console.log(error.specificMessage);
        }
    }

    deleteBank(ID) {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorisedError("Accesible to Administrators Only")
            }
            if (typeof (ID) != 'number') {
                throw new ValidationError("ID should be number")
            }
            let index = this.findBank(ID)
            User.allBanks.splice(index, 1)
            return "Bank Details Deleted Successfully"
        } catch (error) {
            console.log(error.specificMessage);
        }
    }

    transfer(selfAcID, recieverID, recieverAcID, amount, ) {
        let withdraw = false
        let deposit = false
        try {
            let index = this.findCustomer(recieverID)
            let recieverObj = User.allCustomers[index]
            console.log(this); // sender Object
            console.log(recieverObj); 
            let senderAccObj = this.withdrawAmount(selfAcID, amount)
            withdraw = true
            let recieverAccObj = recieverObj.depositAmount(recieverAcID, amount)
            deposit = true
            return [senderAccObj, recieverAccObj]
        } catch (error) {
            if (withdraw && !deposit){
                let revoke = this.depositAmount(selfAcID, amount)
            }
            return error.message
        }
    }

    createNewAccount(bankID, balance) {
        try {
            if (this.isAdmin) {
                throw new UnAuthorisedError("Accesible to Customers Only")
            }
            if (typeof (bankID) != 'number') {
                throw new ValidationError("Bank ID should be number")
            }
            if (typeof (balance) != 'number') {
                throw new ValidationError("Balance should be number")
            }
            if (balance < 0) {
                throw new ValidationError("Balance should be greater than 0")
            }
            let bankIndex = Bank.findBank(bankID)
            let accObj = new Account(balance)

            this.allUserAccounts.push(accObj)
            Bank.allBanks[bankIndex].addBankAccount(accObj)

            // console.log("hello", bankIndex);
            return accObj
        } catch (error) {
            console.log(error.specificMessage);
        }
    }

    findUserAccount(accID) {
        try {
            for (let i = 0; i < this.allUserAccounts.length; i++) {
                if (this.allUserAccounts[i].ID == accID) {
                    return i
                }
            }
        } catch (error) {
            throw error
        }
    }

    // delete
    deleteUserAccount(accID, bankID) {
        try {
            if (this.isAdmin) {
                throw new UnAuthorisedError("Accesible to Customers Only")
            }
            let index = this.findUserAccount(accID)
            if (this.allUserAccounts[index].balance != 0) {
                return "Account cannot be deleted"
            }
            this.allUserAccounts.splice(index, 1)
            // console.log(this.allUserAccounts);

            let bankIndex = Bank.findBank(bankID)
            Bank.allBanks[bankIndex].deleteBankAccount(accID)
            return "Bank Account Deleted Successfully"

        } catch (error) {
            console.log(error.specificMessage);
        }
    }

    withdrawAmount(accID, amount) {
        try {
            if (this.isAdmin) {
                throw new UnAuthorisedError("Accesible to Customers Only")
            }
            let index = this.findUserAccount(accID)
            if (this.allUserAccounts[index].balance < amount) {
                return "Insufficient Balance"
            }
            // console.log(this.allUserAccounts[index]);
            let accObj = this.allUserAccounts[index].withdrawAmount(amount)
            // console.log(accObj);
            // let bankIndex = Bank.findBank(bankID)
            // Bank.allBanks[bankIndex].withdrawAmount(accID, amount)
            return accObj
        } catch (error) {
            console.log();
        }
    }

    depositAmount(accID, amount) {
        try {
            if (this.isAdmin) {
                throw new UnAuthorisedError("Accesible to Customers Only")
            }
            let index = this.findUserAccount(accID)
            if (amount <= 0) {
                return "Amount not satisfied"
            }
            // console.log(this.allUserAccounts[index]);
            let accObj = this.allUserAccounts[index].depositAmount(amount)
            return accObj

        } catch (error) {
            console.log(error);
        }
    }

    // read
    getUserAccounts() {
        try {
            if (this.isAdmin) {
                throw new UnAuthorisedError("Accesible to Customers Only")
            }
            return this.allUserAccounts
        } catch (error) {
            console.log(error.specificMessage);
        }
    }

    transferAmount() {
        try {
            if (this.isAdmin) {
                throw new UnAuthorisedError("Accesible to Customers Only")
            }

        } catch (error) {

        }
    }

}

let adm1 = User.newAdmin("Dipika", "F")
// console.log(adm1);

cust1 = adm1.newCustomer("Priya", "F")
cust2 = adm1.newCustomer("Tilak", "M")
// console.log(cust1);

bank1 = adm1.newBank("ICICI")
// console.log(bank1);

console.log(cust1.createNewAccount(1, 4000));
console.log(cust1.createNewAccount(1, 5900));
console.log(cust1.createNewAccount(1, 0));

console.log(cust2.createNewAccount(1, 6900));  // 2nd customer

console.log("Customer-1 Accounts: ", cust1.getUserAccounts());
console.log("Bank-1 Accounts: ", bank1.getBankAccounts());

console.log(cust1.deleteUserAccount(3, 1));

console.log("Customer-1 Accounts: ", cust1.getUserAccounts());
console.log("Bank-1 Accounts: ", bank1.getBankAccounts());

console.log(cust1.withdrawAmount(1, 1, 100));

console.log("Customer-1 Accounts: ", cust1.getUserAccounts());
console.log("Bank-1 Accounts: ", bank1.getBankAccounts());

console.log(cust1.depositAmount(1, 1, 500));

console.log("Customer-1 Accounts: ", cust1.getUserAccounts());
console.log("Bank-1 Accounts: ", bank1.getBankAccounts());

console.log("----------------------------------------------------------------");
console.log("Transfer: ", cust1.transfer(1, 2, 4, 400));









