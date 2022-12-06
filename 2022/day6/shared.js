(() => {
	const fileUtil = require('./fileUtil');

	function getUnique(arr) {
		let unique = [];

		for (let item of arr) {
			if (!unique.includes(item)) {
				unique.push(item);
			}
		}

		return unique;
	}

	function checkForMarker(markerLength, line) {
		let toCheck = [];

		for (let i = 0; i < line.length; i++) {
			const c = line[i];

			if (toCheck.length < markerLength) {
				toCheck.push(c);
			}
			else {
				if (getUnique(toCheck).length == markerLength) {
					return i;
				}
				else {
					toCheck.splice(0, 1);
					toCheck.push(c);
				}
			}
		}
	}

	module.exports = {fileUtil, checkForMarker};
})();