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

		for (let i = 0; i < numToMove; i++) {
			const toMove = creates[from].pop();
			creates[dest].push(toMove);
		}
	}

	function onAllLinesRead(shared) {
		console.log('part 1 = ' + shared.getAns(creates));// FZCMJCRHZ
	}

	module.exports = {processLine, onAllLinesRead};
})();