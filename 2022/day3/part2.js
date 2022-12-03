(() => {
	let i = 0;
	let lines = [];
	let sum = 0;

	function processLine(line, shared) {
		i++;
		lines.push(line);

		const linesAtATime = 3;

		if (!(i % linesAtATime)) {
			const common = shared.getCommon(lines);

			for (let c in common) {
				sum += shared.getPrioritySum(c);
			}

			lines = [];
		}
	}

	function onAllLinesRead(shared) {
		return sum;// 2758
	}

	module.exports = {processLine, onAllLinesRead};
})();