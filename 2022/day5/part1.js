(() => {
	let crates = [];

	function processLine(line, shared) {
		crates = shared.parseCLine(line, crates);
		const {from, dest, numToMove} = shared.readILine(line);

		for (let i = 0; i < numToMove; i++) {
			const toMove = crates[from].pop();
			crates[dest].push(toMove);
		}
	}

	function onAllLinesRead(shared) {
		console.log('part 1 = ' + shared.getAns(crates));// FZCMJCRHZ
	}

	module.exports = {processLine, onAllLinesRead};
})();