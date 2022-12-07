(() => {
	let fs;
	let cd = '';
	let inLs = false;

	function processLine(line, shared) {
		const ret = shared.readFs(line, fs, cd, inLs);
		fs = ret.fs, cd = ret.cd, inLs = ret.inLs;
	}

	function onAllLinesRead(shared) {
		const maxDirSize = 100000;
		let sum = 0;

		for (let dir in fs) {
			const dirSize = shared.calcDirSize(fs, dir, 0);

			if (dirSize <= maxDirSize) {
				sum += dirSize;
			}
		}

		console.log('part 1 = ' + sum);// 2031851
	}

	module.exports = {processLine, onAllLinesRead};
})();