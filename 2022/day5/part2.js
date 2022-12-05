(() => {
	let creates = [];

	function processLine(line, shared) {
		creates = shared.parseCLine(line, creates);
		const {from, dest, numToMove} = shared.readILine(line);
		const toMove = creates[from].splice(creates[from].length - numToMove, numToMove);
		creates[dest] = creates[dest].concat(toMove);
	}

	function onAllLinesRead(shared) {
		console.log('part 2 = ' + shared.getAns(creates));// JSDHQMZGF
	}

	module.exports = {processLine, onAllLinesRead};
})();