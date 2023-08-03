let e = new Error("Hello Error")
e.name = "Trial"
console.log(e.name);
console.log("---------------------------");
console.log(e.stack);
console.log("---------------------------");
console.log(e.message);