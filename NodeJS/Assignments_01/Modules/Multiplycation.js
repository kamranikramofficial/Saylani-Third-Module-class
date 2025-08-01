let MultiplicationMassage = "This is Multiplication Module";

function MultiplicationFunction(num1, num2) {
    let finaladdvalue = num1 * num2;
    console.log(`This is First Value ${num1} And this is seconde Value ${num2} This is final value ${finaladdvalue}`);
    return finaladdvalue;
}

module.exports = {
    MultiplicationMassage,
    MultiplicationFunction
}