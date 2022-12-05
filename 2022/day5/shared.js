(() => {
	const fileUtil = require('./fileUtil');

	function parseCLine(line, crates) {
		const cLine = line.match(/(?:(\s{3})|(\[[A-Z]\]))(?: |$)/g);

		if (cLine) {
			for (let i = 0; i < cLine.length; i++) {
				if (!crates[i]) {
					crates[i] = [];
				}

				const create = cLine[i].trim();

				if (create) {
					crates[i].splice(0, 0, create.match(/[A-Z]/)[0]);
				}
			}
		}

		return crates;
	}

	function readILine(line) {
		const iLine = line.match(/^move (\d+) from (\d+) to (\d+)$/);

		if (!iLine) {
			return {from: 0, dest: 0, numToMove: 0};
		}

		return {from: parseInt(iLine[2]) - 1, dest: parseInt(iLine[3]) - 1, numToMove: parseInt(iLine[1])};
	}

	function getAns(crates) {
		let str = '';

		for (let i = 0; i < crates.length; i++) {
			str += crates[i][crates[i].length - 1];
		}

		return str;
	}

	module.exports = {fileUtil, parseCLine, readILine, getAns};
})();