

class Bank{
    static allBanks = []
    static bankID = 1
    constructor(bankName){
        this.ID = Bank.bankID++
        this.bankName = bankName
        this.allBankAccounts = []
    }

    static addBank(bankObj){
        Bank.allBanks.push(bankObj) 
    }

    static findBank(ID){
        try {
            for (let i=0; i < Bank.allBanks.length; i++) {
                if (Bank.allBanks[i].ID == ID){
                    return i
                }
            } 
            throw new NotFoundError("Bank ID not found")
        } catch (error) {
            throw error
        }
    }

    addBankAccount(accObj){
        this.allBankAccounts.push(accObj)
    }

    findBankAccount(ID){
        try {
            for (let i=0; i<this.allBankAccounts.length; i++){
                if (this.allBankAccounts[i].ID == ID){
                    return i
                }
            }
        } catch (error) {
            throw error
        }
    }

    getBankAccounts(){
        return this.allBankAccounts
    }

    deleteBankAccount(accID){
        try {
            let index = this.findBankAccount(accID)
            // console.log(index);
            this.allBankAccounts.splice(index, 1)
        } catch (error) {
            throw error
        }
    }

    withdrawAmount(accID, amount){
        try {
            let index = this.findBankAccount(accID)
            this.allBankAccounts[index].withdrawAmount(amount)
        } catch (error) {
            throw error
        }
    }

    updateBank(parameter, newValue){
        try {
            switch (parameter){
                case "bankName":
                    if (typeof(newValue) != 'string'){
                        throw new ValidationError("Invalid Name")
                    }
                    this.bankName = newValue
                    return this
                default:
                    throw new ValidationError("Invalid Parameter")
            }   
        } catch (error) {
            console.log(error.specificMessage);
        } 
    }
}

module.exports = Bank