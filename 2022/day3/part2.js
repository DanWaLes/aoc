(() => {
	function processLine(line, data, shared) {
		if (!data) {
			data = {i: 0, lines: [], sum: 0};
		}

		data.i++;
		data.lines.push(line);

		const linesAtATime = 3;

		if (!(data.i % linesAtATime)) {
			const common = shared.getCommon(data.lines);

			for (let c in common) {
				data.sum += shared.getPrioritySum(c);
			}

			data.lines = [];
		}

		return data;
	}

	function onAllLinesRead(data, shared) {
		return data.sum;// 2758
	}

	module.exports = {processLine, onAllLinesRead};
})();