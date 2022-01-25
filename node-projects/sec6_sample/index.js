var {echo, area} = require("./methods");
var Lamborgini = require("./lamborgini");
var config = require("./config");
echo("hello!");
console.log(area(5, 10));

var car = new Lamborgini("lamborgini!!!!!!!!");
car.echo();
car.drive();

console.log(config);
console.log(JSON.stringify(config)); //これでjson形式に変換。jsonはプロパティにダブルクウォートつく（シングルクウォートは使えない）