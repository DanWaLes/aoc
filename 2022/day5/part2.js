(() => {
	let creates = [];

	function processLine(line, shared) {
		creates = shared.parseCLine(line, creates);

		const iLine = line.match(/move (\d+) from (\d+) to (\d+)/);

		if (!iLine) {
			return;
		}

		const from = parseInt(iLine[2]) - 1;
		const dest = parseInt(iLine[3]) - 1;
		const numToMove = parseInt(iLine[1]);

		const toMove = creates[from].slice(creates[from].length - numToMove);
		creates[from].splice(creates[from].length - numToMove, numToMove);
		creates[dest] = creates[dest].concat(toMove);
	}

	function onAllLinesRead(shared) {
		console.log('part 2 = ' + shared.getAns(creates));// JSDHQMZGF
	}

	module.exports = {processLine, onAllLinesRead};
})();