//
// Helper Functions
//

// Minimum inclusive, Maximum exclusive
function getRandomIntMin(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

// Minimum (0) inclusive, Maximum exclusive
function getRandomInt(max) {
	max = Math.floor(max);
	return Math.floor(Math.random() * max);
}

// Outputs random hex color code
function randomColor() {
	return Math.floor(Math.random() * 16777215).toString(16);
}

module.exports = {
	getRandomIntMin,
	getRandomInt,
	randomColor,
};
