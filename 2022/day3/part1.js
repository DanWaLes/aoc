(() => {
	function processLine(line, data, shared) {
		if (!data) {
			data = {sum: 0};
		}

		const compartmentSize = line.length / 2;
		const c1 = line.substring(0, compartmentSize);
		const c2 = line.substring(compartmentSize, line.length);
		const common = shared.getCommon([c1, c2]);

		for (let c in common) {
			data.sum += shared.getPrioritySum(c);
		}

		return data;
	}

	function onAllLinesRead(data, shared) {
		return data.sum;// 7553
	}

	module.exports = {processLine, onAllLinesRead};
})();