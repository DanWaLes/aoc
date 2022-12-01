(async () => {
	const fileUtil = require('./fileUtil');
	const snacks = (await fileUtil.load(['input.txt']))['input.txt'].split('\n');

	let calories = [];// for part 2
	let i = 0;

	for (let line of snacks) {
		if (line) {
			if (!calories[i]) {
				calories[i] = 0;
			}

			calories[i] += (parseInt(line));
		}
		else {
			i++;
		}
	}

	calories.sort((a, b) => {
		return b - a;
	});
	
	function getTopXSum(x) {
		let sum = 0;

		while (x > -1) {
			sum += calories[x];
			x--;
		}

		return sum;
	}

	console.log('part one = ' + getTopXSum(0));// 75501
	console.log('part two = ' + getTopXSum(2));// 215594
})();