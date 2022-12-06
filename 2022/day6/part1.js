(() => {
	let startOfPacketMarkers = [];

	function processLine(line, shared) {
		const startOfPacketMarkerLength = 4;

		startOfPacketMarkers.push(shared.checkForMarker(startOfPacketMarkerLength, line));
	}

	function onAllLinesRead(shared) {
		console.log('part 1 = ' + startOfPacketMarkers.toString());// 1140
	}

	module.exports = {processLine, onAllLinesRead};
})();