(async () => {
	const shared = require('./shared'), parts = [require('./part1'), require('./part2')];

	await shared.fileUtil.readByLines('input.txt', (line) => {
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