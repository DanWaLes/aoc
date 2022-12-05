(() => {
	const fileUtil = require('./fileUtil');

	function parseCLine(line, creates) {
		const cLine = line.match(/(?:(\s{3})|(\[[A-Z]\]))(?: |$)/g);

		if (cLine) {
			for (let i = 0; i < cLine.length; i++) {
				if (!creates[i]) {
					creates[i] = [];
				}

				const create = cLine[i].trim();

				if (create) {
					creates[i].splice(0, 0, create.match(/[A-Z]/)[0]);
				}
			}
		}

		return creates;
	}
	
	function getAns(creates) {
		let str = '';

		for (let i = 0; i < creates.length; i++) {
			str += creates[i][creates[i].length - 1];
		}

		return str;
	}

	module.exports = {fileUtil, parseCLine, getAns};
})();