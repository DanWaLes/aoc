(async () => {
	const fileUtil = require('./fileUtil');
	const lines = (await fileUtil.load(['input.txt']))['input.txt'].split('\n');

	function getCharFreqs(str) {
		let freq = {};
		for (let c of str) {
			if (!freq[c]) {
				freq[c] = 0;
			}

			freq[c]++;
		}

		return freq;
	}

	function getCommon(...strs) {
		let common = getCharFreqs(strs[0]);

		for (let i = 1; i < strs.length; i++) {
			const freq = getCharFreqs(strs[i]);

			for (let c in common) {
				const existingFreq = common[c];
				const newFreq = freq[c];

				if (newFreq) {
					common[c] = Math.min(existingFreq, newFreq);
				}
				else {
					delete common[c];
				}
			}
		}

		return common;
	}

	function getPrioritySum(c) {
		const lettersInAlphabet = 26;
		const A = 'A'.charCodeAt(0);
		const a = 'a'.charCodeAt(0);

		if (c.toUpperCase() == c) {
			return c.charCodeAt(0) - A + 1 + lettersInAlphabet;
		}

		return c.charCodeAt(0) - a + 1;
	}

	let sums = [0, 0];
	let p2lines = [];

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].replace(/^\s*|\s*$/g, '');

		if (line) {
			sums[0] += doPart1(line);
			sums[1] += doPart2(i, line);
		}
	}

	function doPart1(line) {
		const compartmentSize = line.length / 2;
		const c1 = line.substring(0, compartmentSize);
		const c2 = line.substring(compartmentSize, line.length);
		const common = getCommon(c1, c2);
		let sum = 0;

		for (let c in common) {
			sum += getPrioritySum(c);
		}

		return sum;
	}

	function doPart2(i, line) {
		const linesAtATime = 3;
		if ((i + 1) % linesAtATime) {
			p2lines.push(line);
			return 0;
		}
		else {
			p2lines.push(line);

			const common = getCommon(p2lines[0], p2lines[1], p2lines[2]);
			let sum = 0;

			for (let c in common) {
				sum += getPrioritySum(c);
			}

			p2lines = [];

			return sum;
		}
	}

	for (let i = 0; i < sums.length; i++) {
		console.log('part ' + (i + 1) + ' = ' + sums[i]);
	}

	// part 1 = 7553
	// part 2 = 2758
})();