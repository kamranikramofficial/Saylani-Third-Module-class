let SubtractionMassage = "This is Subtraction Module";

function SubtractionFunction(num1, num2) {
    let finalsubvalue = num1 - num2;
    console.log(`This is First Value ${num1} And this is seconde Value ${num2} This is final value ${finalsubvalue}`);
    return finalsubvalue;
}

module.exports = {
    SubtractionMassage,
    SubtractionFunction
}
