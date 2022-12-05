(function() {
	const fs = require('fs');
	const readline = require('readline');

	async function readByLines(filename, onNewLine) {
		const rl = readline.createInterface({
			input: fs.createReadStream(filename),
			crlfDelay: Infinity
		});

		for await (const line of rl) {
			onNewLine(line);
		}
	}

	module.exports = {readByLines};
})();