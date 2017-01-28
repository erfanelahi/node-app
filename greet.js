function myPrintResult(fn){
    console.log(fn());
}
function multiply(){
    var a = 3.1416;
    var b = 9.81;
    var c = a*b;
    return c;
}
module.exports = {
    MyPrintResult : myPrintResult,
    Multiply : multiply 
}
//******************************************** *//
// console.log("Done Start!!!");
// setTimeout(function(){
//     console.log("Hello setTimeout!!!");
// }.bind(this), 1000);
// console.log("Done End!!!");
// class Abc {
//     constructor(){
//         this.arr = [{label: "abc1", value: "xyz1"}, {label: "abc2", value: "xyz2"}, {label: "abc3", value: "xyz3"}];
//         this.search = "xyz2";
//     }
//     Print1() {
//         console.log(this.arr.findIndex(function(a) {
//                 console.log(this);
//                 return a.value === this.search;
//         }.bind(this)));
//     }
//     Print2() {
//         let self = this;
//         console.log(this.arr.findIndex(function(a) {
//                 console.log(this);
//                 return a.value === self.search;
//         }));
//     }
//     Print3() {
//         console.log(this.arr.findIndex((a) => {
//                 console.log(this);
//                 return a.value === this.search;
//         }));
//     }
// }
// var a = new Abc();
// a.Print1();
// a.Print2();
// a.Print3();
// //Shorthand properties
// let firstName = "Mir";
// let lastName = "Elahi";
// const getFullName = function() {
//     this["middleName"] = "Erfan";
//     console.log(this.firstName+" "+this.middleName+" "+this.lastName+". getFullName called!");
// }
// function dummyF1(){
//     console.log("dummyF1 called!");
// }
// var myNameObj = {
//     getFullName, 
//     firstName, 
//     lastName, 
//     dummyF1,
//     dummyF2() { 
//         console.log("dummyF2 called!"); 
//     },
//     [firstName]:function(){
//         console.log(firstName+" called!"); 
//     }
// };
// for(let prop in myNameObj) {
//     if(typeof myNameObj[prop] !== 'function'){
//         console.log(prop+" : "+myNameObj[prop]);
//     }
//     else{
//         myNameObj[prop]();
//     }
// }
// console.log(myNameObj);
// var first = [1,2,3];
// var second = [4,5,6];
// console.log(...[4,5,6]);
// first.push(...second);
// console.log(first);
// function addItems(a, b, c, ...d){
//     let rest = 0;
//     for(var v of d) {
//         rest += v;
//     }
//     console.log(a+b+c+rest);
// }
// addItems(...second, ...first);

// function myStringTemplete(strings, ...values) {
//     if(values[0] > 15) {
//        values[1] = "Awake"; 
//     }
//     return `${strings[0]}${values[0]}${strings[1]}${values[1]}`;
// }
// var message = myStringTemplete`It is ${new Date().getHours()} I'm ${""}`;
// console.log(message);
// var oData = {
//     name : "oData",
//     apiFormat : "xml"
// }
// var {name, apiFormat: format} = oData;
// console.log(name+" "+format);
// var myArray = [1,2,3,4,5];
// var [one,,,,five] = myArray;
// console.log(one+" "+five);
// var oDataCollections = [ oData, {
//     name : "oData",
//     apiFormat : "json"
// },
// {
//     name : "oData",
//     apiFormat : "json/xml"
// }]
// oDataCollections.forEach(({apiFormat})=>console.log(apiFormat));
// var [, oDataJson] = oDataCollections;
// function printJsonFormat({name, apiFormat: format}) {
//     console.log(name+" "+format);
// }
// printJsonFormat(oDataJson);

// var i = 0;
// function testFunction(fn){
//     let j = ++i;
//     console.log("Print : "+j);
//     if(i<3){
//         fn(fn);
//     }
//     console.log("Hello World : "+j);
// }
// testFunction(testFunction);