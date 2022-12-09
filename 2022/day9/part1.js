(() => {
	let head = [0, 0], tail = {visited: [[0, 0]], loc: [0, 0]};

	function checkIfTailVisted() {
		for (let loc of tail.visited) {
			if (!(loc[0] == tail.loc[0] && loc[1] == tail.loc[1])) {
				tail.visited.push([tail.loc[0], tail.loc[1]]);
				break;
			}
		}
	}

	function processLine(line, shared) {
		const ins = line.match(/([RLUD]) (\d+)/);
		const dir = ins[1];
		let dist = parseInt(ins[2]);

		const mvBy = ['R', 'U'].includes(dir) ? 1 : -1;
		const isHorz = ['R', 'L'].includes(dir);
		const dirNo = isHorz ? 0 : 1;

		while (dist) {
			head[dirNo] += mvBy;

			const diff = Math.max(head[dirNo], tail.loc[dirNo]) - Math.min(head[dirNo], tail.loc[dirNo]);

			if (diff > 1) {
				tail.loc[dirNo] += mvBy;
			}

			checkIfTailVisted();
			dist--;
		}
	}

	async function onAllLinesRead(shared) {
		console.log('part 1 = ' + tail.visited.length);// 24, this is incorrect
	}

	module.exports = {processLine, onAllLinesRead};
})();