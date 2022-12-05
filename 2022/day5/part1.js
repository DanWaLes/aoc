(() => {
	let creates = [];

	function processLine(line, shared) {
		creates = shared.parseCLine(line, creates);
		const {from, dest, numToMove} = shared.readILine(line);

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