(() => {
	const fileUtil = require('./fileUtil');

	function readFs(line, fs, cd, inLs) {
		if (!fs) {
			fs = {'/': {dirs: [], files: []}};
		}

		const cdCmd = line.match(/^\$ cd (.+)$/);
		const lsCmd = line.match(/^\$ ls$/);

		if (cdCmd) {
			inLs = false;
			const dirName = cdCmd[1];

			if (dirName == '..') {
				cd = cd.replace(/[^\/]+\/$/, '');
			}
			else if (dirName == '/') {
				cd = '/';
			}
			else {
				cd += dirName + '/';
			}
		}
		else if (lsCmd) {
			inLs = true;
		}
		else if (inLs) {
			const newDir = line.match(/^dir (.+)/);
			const newFile = line.match(/^(\d+) (.+)/);

			if (newDir) {
				const newDirName = newDir[1];
				const newDirLocation = cd + newDirName + '/';

				fs[cd].dirs.push(newDirLocation);
				fs[newDirLocation] = {dirs: [], files: []};
			}
			else if (newFile) {
				fs[cd].files.push({name: newFile[2], size: parseInt(newFile[1])});
			}
			else {
				throw 'this should never happen';
			}
		}

		return {fs, cd, inLs};
	}

	function calcDirSize(fs, dir, currSum) {
		for (let file of fs[dir].files) { 
			currSum += file.size;
		}

		for (let newDir of fs[dir].dirs) {
			currSum += calcDirSize(fs, newDir, 0);
		}

		return currSum;
	}

	module.exports = {fileUtil, readFs, calcDirSize};
})();