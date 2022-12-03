(async () => {
	const shared = require('./shared');
	const lines = (await shared.fileUtil.load(['input.txt']))['input.txt'].replace(/\s*$/, '').split(/\r?\n|\r/);
	const parts = [require('./part1'), require('./part2')];

	for (let line of lines) {
		for (let part of parts) {
			part.processLine(line, shared);
		}
	}

	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];

		console.log('part ' + (i + 1) + ' = ' + part.onAllLinesRead(shared));
	}
})();
