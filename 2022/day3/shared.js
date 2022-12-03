(() => {
	const fileUtil = require('./fileUtil');

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

	function getCommon(strs) {
		// strs [string1, string2, etc]

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

		if (c.toUpperCase() == c) {
			return c.charCodeAt() - 'A'.charCodeAt() + 1 + lettersInAlphabet;
		}

		return c.charCodeAt() - 'a'.charCodeAt() + 1;
	}

	module.exports = {fileUtil, getCommon, getPrioritySum};
})();