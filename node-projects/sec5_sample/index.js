//24.Globals
//console.log(__dirname) //F5で実行
//console.log(__filename) //F5で実行

//25.遅延実行
//setTimeout(() => {
//	console.log("setTimeout()");
//}, 100);

//console.log("Global");

//var end = (new Date()).getTime() + 3000;
//while ((new Date()).getTime() < end) {} //シングルスレッドなので、この処理が終わってからsetTimeoutが実行される


//26.イベントループ
//setTimeout(() => {
//	console.log("setTimeout()");
//}, 100);

//setImmediate(() => {
//	console.log("setImmediate()");
//});

//process.nextTick(() => {
//	console.log("nextTick()");
//});

//Promise.resolve().then(() => {
//	console.log("promise.resolve().then()");
//});


//nextTick() //キューの処理その１
//promise.resolve().then() //キューの処理その２
//setImmediate() //setTimeoutは100ミリs指定してるので飛ばしてこれが来る
//setTimeout()//100ミリs指定しているし1番最後