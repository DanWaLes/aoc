(() => {
	let index;

	function processLine(line, shared) {
		const startOfMessageMarkerLength = 14;

		index = shared.checkForMarker(startOfMessageMarkerLength, line);
	}

	function onAllLinesRead(shared) {
		console.log('part 2 = ' + index);// 3495
	}

	module.exports = {processLine, onAllLinesRead};
})();