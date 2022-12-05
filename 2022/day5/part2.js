(() => {
	let crates = [];

	function processLine(line, shared) {
		crates = shared.parseCLine(line, crates);
		const {from, dest, numToMove} = shared.readILine(line);
		const toMove = crates[from].splice(crates[from].length - numToMove, numToMove);
		crates[dest] = crates[dest].concat(toMove);
	}

	function onAllLinesRead(shared) {
		console.log('part 2 = ' + shared.getAns(crates));// JSDHQMZGF
	}

	module.exports = {processLine, onAllLinesRead};
})();