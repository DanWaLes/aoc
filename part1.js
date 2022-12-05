(() => {
	let creates = [];

	function processLine(line, shared) {
		creates = shared.parseCLine(line, creates);
		const iLine = shared.readILine(line);

		for (let i = 0; i < iLine.numToMove; i++) {
			const toMove = creates[iLine.from].pop();
			creates[iLine.dest].push(toMove);
		}
	}

	function onAllLinesRead(shared) {
		console.log('part 1 = ' + shared.getAns(creates));// FZCMJCRHZ
	}

	module.exports = {processLine, onAllLinesRead};
})();