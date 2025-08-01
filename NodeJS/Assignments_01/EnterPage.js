let {AdditionMassage,AdditionFunction}=require('./Modules/Addition.js');
let {SubtractionMassage,SubtractionFunction}=require('./Modules/Substraction.js');
let {MultiplicationMassage,MultiplicationFunction}=require('./Modules/Multiplycation.js');
let {DivisonMassage,DivisonFunction}=require('./Modules/Divison.js');


console.log(AdditionMassage);
AdditionFunction(5,10);
 
console.log(SubtractionMassage);
SubtractionFunction(10,5);

console.log(MultiplicationMassage);
MultiplicationFunction(5,5);

console.log(DivisonMassage);
DivisonFunction(5,5);

console.log("All operations completed successfully.");
