(() => {
	let sum = 0;

	function processLine(line, shared) {
		const compartmentSize = line.length / 2;
		const c1 = line.substring(0, compartmentSize);
		const c2 = line.substring(compartmentSize, line.length);
		const common = shared.getCommon([c1, c2]);

		for (let c in common) {
			sum += shared.getPrioritySum(c);
		}
	}

	function onAllLinesRead(shared) {
		return sum;// 7553
	}

	module.exports = {processLine, onAllLinesRead};
})();