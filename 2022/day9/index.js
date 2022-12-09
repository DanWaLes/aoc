(async () => {
	const shared = require('./shared'), parts = [require('./part1'), require('./part2')];
	const testing = true;
	const input = (() => {
		let str = 'input';

		if (testing) {
			str += '_test';
		}

		return str + '.txt';
	})();

	await shared.fileUtil.readByLines(input, (line) => {
		for (let part of parts) {
			part.processLine(line, shared);
		}
	});

	for (let part of parts) {
		await part.onAllLinesRead(shared);
	}
})().catch((err) => {
	console.log(err);
});