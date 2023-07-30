
function prime(number){
    if (typeof(number) != "number"){
        return["Invalid Data Type"]
    }
    
    for (i=2; i<number/2; i++){
        if (number%i==0){
            return ["It is not a prime number."]
        }
    }
    return ["It is a prime number."]
}
 
function fibonacci(number){
    if (typeof(number) != "number"){
        return["Invalid Data Type"]
    }
    let firstNumber = 0
    let secondNumber = 1
    let thirdNumber = 0 
    let sum = 0
    for (i=0; i<number; i++){
        thirdNumber = firstNumber + secondNumber
        console.log(secondNumber)
        sum = sum + secondNumber

        firstNumber = secondNumber
        secondNumber = thirdNumber
    }
    return["Sum of Fibbonacci Series is upto " + number + " numbers is " + sum]
}

function evenOdd(number){
    console.log(typeof(number))
    console.log(number)
    let evenCount = 0
    let oddCount = 0
    let zeroCount = 0
    if (typeof(number) == "object"){
        for (i=0; i<number.length; i++){
            if (typeof(number[i]) != "number"){
                return ["Invalid Data Type in List"]
            }
            if (number[i] == 0){
                zeroCount++
            } else {
                if (number[i]%2 == 0){
                    evenCount++
                } else {
                    oddCount++
                }
            }
        }
    } else if (typeof(number) == "number"){
        for (i=0; i<=number; i++){
            if (i == 0){
                zeroCount++
            } else {
                if (i%2 == 0){
                    evenCount++
                } else {
                    oddCount++
                }
            }
        } 
    } else {
        return ["Invalid Data Type"]
    }
    return ["No. of Zeros are "+zeroCount, "No. of Even are "+evenCount, "No. of Odd are "+oddCount]
}


let fxn = prime(9)
// let fxn = fibonacci(8)
// let fxn = evenOdd([1, 7, 8, 9, "Hello", 5, 0, 4])
// let fxn = evenOdd([1, 7, 8, 9, 0, 5, 0, 4])


for (i=0; i<fxn.length; i++){
    console.log(fxn[i])
}
