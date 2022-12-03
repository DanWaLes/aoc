(() => {
	const extraShapeNames = {
		X: 'rock',
		Y: 'paper',
		Z: 'scissors'
	};
	let sum = 0;

	function processLine(line, shared) {
		const letters = line.match(/([A-C])\s([X-Z])/i);
		const opponentPlayed = shared.shapeNames[letters[1].toUpperCase()];
		const iPlayed = extraShapeNames[letters[2].toUpperCase()];
		const opponentSS = shared.scores[opponentPlayed];
		const mySS = shared.scores[iPlayed];

		sum += mySS;

		if (mySS == opponentSS) {
			sum += shared.scores.draw;
		}
		else if (mySS > opponentSS) {
			if (iPlayed == 'scissors' && opponentPlayed == 'rock') {
				sum += shared.scores.loss;
			}
			else {
				sum += shared.scores.win;
			}
		}
		else {
			if (iPlayed == 'rock' && opponentPlayed == 'scissors') {
				sum += shared.scores.win;
			}
			else {
				sum += shared.scores.loss;
			}
		}
	}

	function onAllLinesRead(shared) {
		return sum;// 15523
	}

	module.exports = {processLine, onAllLinesRead};
})();