var Car = class {
	constructor(name) {
		this.name = name;
	}

	drive() {
		console.log(("zoom zoom ..."));
	}
}

module.exports = Car;