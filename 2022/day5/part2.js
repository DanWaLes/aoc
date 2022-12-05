(() => {
	let creates = [];

	function processLine(line, shared) {
		creates = shared.parseCLine(line, creates);
		const iLine = shared.readILine(line);
		const toMove = creates[iLine.from].splice(creates[iLine.from].length - iLine.numToMove, iLine.numToMove);
		creates[iLine.dest] = creates[iLine.dest].concat(toMove);
	}

	function onAllLinesRead(shared) {
		console.log('part 2 = ' + shared.getAns(creates));// JSDHQMZGF
	}

	module.exports = {processLine, onAllLinesRead};
})();