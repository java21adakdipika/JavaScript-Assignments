
class Account{
    static accID = 1
    constructor(balance){
        this.ID = Account.accID++
        this.balance = balance
    }

    withdrawAmount(amount){
        try {
            this.balance = this.balance - amount
            // console.log(this.balance);
            return this
        } catch (error) {
            throw error
        }
    }

    depositAmount(amount){
        try {
            this.balance = this.balance + amount
            // console.log(this.balance);
            return this
        } catch (error) {
            throw error
        }
    }
}

module.exports = Account