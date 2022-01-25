var Car = require("./car");
var lamborgini = class extends Car {
	constructor(name) {
		super(name);
	}

	echo() {
		super.drive();
	}

	drive(){
		console.log(`fire ${this.name}`);
	}
}

module.exports = lamborgini;