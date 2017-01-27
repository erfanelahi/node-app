var p = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        if(true){
            resolve("Hello Promise!!!");
        }
        else {
            reject("Promise not working!!!");
        }
    },2000);
}).then(data=> { console.log(data); return "Hello Another Promise!!!"; })
.then(anotherData=> { console.log(anotherData);throw new Error("Error Throwed From Another");return "Hello 3rd Promise!!!"; })
.then(_3rdData=>console.log(_3rdData))
.catch(error=>console.error(error));
function* StoreXY(){
    let x = 1, y = 1, passedValue = 0;
    while(true){
        passedValue = yield {X:x, Y:y};
        yield {X:x+passedValue, Y:y+passedValue};
        x += 1;
        y += 2;
    }
}
var generatorStoreXY = StoreXY();
console.log(generatorStoreXY.next().value);
console.log(generatorStoreXY.next(3).value);
console.log(generatorStoreXY.next().value);
console.log(generatorStoreXY.next(5).value);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const fetchSomethingNew = () => new Promise((resolve) => {
  setTimeout(() => resolve('future value'), 500);
});

const promiseFunc = () => new Promise((resolve) => {
  fetchSomethingNew().then(result => {
    resolve(result + ' 2');
  });
});

promiseFunc().then(res => console.log(res));
console.log("Async Promise");
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const isPromise = (obj) => typeof obj !== 'undefined' &&
  typeof obj.then === 'function';

const next = (iter, callback, prev = undefined) => {
  const item = iter.next(prev);
  const value = item.value;

  if (item.done) return callback(prev);

  if (isPromise(value)) {
    value.then(val => {
      setImmediate(() => next(iter, callback, val));
    });
  } else {
    setImmediate(() => next(iter, callback, value));
  }
};

const gensync = (fn) =>
    (...args) => new Promise(resolve => {
  next(fn(...args), val => resolve(val));
});



/* How to use gensync() */

const fetchSomething = () => new Promise((resolve) => {
  setTimeout(() => resolve('generator value'), 500);
});

const asyncFunc = gensync(function* () {
  const result = yield fetchSomething(); // returns promise

  // waits for promise and uses promise result
  yield result + ' 123';
});

// Call the async function and pass params.
asyncFunc('param1', 'param2', 'param3')
.then(val => console.log(val)); // 'generator value 123'
console.log("Async Generator Promise");