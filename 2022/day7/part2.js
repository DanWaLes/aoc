(() => {
	let fs;
	let cd = '';
	let inLs = false;

	function processLine(line, shared) {
		const ret = shared.readFs(line, fs, cd, inLs);
		fs = ret.fs, cd = ret.cd, inLs = ret.inLs;
	}

	async function onAllLinesRead(shared) {
		const capacity = 70000000;
		const updateSize = 30000000;
		let dirSizes = [];

		for (let dir in fs) {
			const dirSize = shared.calcDirSize(fs, dir, 0);

			dirSizes.push({dir: dir, size: dirSize});
		}

		dirSizes.sort((a, b) => a.size - b.size);

		// await shared.fileUtil.save([{name: 'dirSizes.json', content: shared.prettyPrint(dirSizes)}]);// for debugging

		const usedSpace = dirSizes[dirSizes.length - 1].size;
		const totalUsedSpace = updateSize + usedSpace;
		const toDelete =  totalUsedSpace - capacity;
		// console.log('usedSpace = ' + usedSpace);
		// console.log('updateSize = ' + updateSize);
		// console.log('totalUsedSpace = ' + totalUsedSpace);
		// console.log('capacity = ' + capacity);
		// console.log('totalUsedSpace > capacity = ' + (totalUsedSpace > capacity));
		// console.log('toDelete = ' + toDelete);

		for (let dir of dirSizes) {
			if (dir.size >= toDelete) {
				console.log('part 2 = ' + dir.size);// 2568781
				return;
			}
		}

		console.log('no directory >= toDelete');
	}

	module.exports = {processLine, onAllLinesRead};
})();