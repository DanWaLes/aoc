(() => {
	const outcomes = {
		X: 'loss',
		Y: 'draw',
		Z: 'win'
	};
	let sum = 0;

	function processLine(line, shared) {
		const letters = line.match(/([A-C])\s([X-Z])/i);
		const opponentPlayed = shared.shapeNames[letters[1].toUpperCase()];
		const opponentSS = shared.scores[opponentPlayed];
		const outcome = outcomes[letters[2].toUpperCase()];

		sum += shared.scores[outcome];

		if (outcome == outcomes.X) {
			let mySS = opponentSS - 1;

			if (opponentPlayed == 'rock') {
				mySS = shared.scores.scissors;
			}

			sum += mySS;
		}
		else if (outcome == outcomes.Y) {
			sum += opponentSS;
		}
		else {
			let mySS = opponentSS + 1;

			if (opponentPlayed == 'scissors') {
				mySS = shared.scores.rock;
			}

			sum += mySS;
		}
	}

	function onAllLinesRead(shared) {
		return sum;// 15702
	}

	module.exports = {processLine, onAllLinesRead};
})();