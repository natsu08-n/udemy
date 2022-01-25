var Car = require("./car")
var lamborgini = class extentds Car {
	constructor(name) {
		super(name)
	}

	echo() {
		super.drive();
	}
	drive() {
		console.log(`fire ${this.name}`);
	}
};