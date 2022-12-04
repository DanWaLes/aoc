(() => {
	let sum = 0;

	function hasOverlap(elf1, elf2) {
		return elf1[0] >= elf2[0] && elf1[1] <= elf2[1];
	}

	function processLine(line, shared) {
		const pair = shared.readPair(line);

		if (hasOverlap(pair.elf1, pair.elf2) || hasOverlap(pair.elf2, pair.elf1)) {
			sum++;
		}
	}

	function onAllLinesRead(shared) {
		return sum;// 526
	}

	module.exports = {processLine, onAllLinesRead};
})();