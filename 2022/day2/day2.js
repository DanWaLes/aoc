(async () => {
	const fileUtil = require('./fileUtil');
	const stratGuideByLines = (await fileUtil.load(['input.txt']))['input.txt'].split('\n');

	const scores = {
		win: 6,
		draw: 3,
		loss: 0
	};
	const shapes = {
		A: 'rock',
		B: 'paper',
		C: 'scissors',
		X: 'rock',
		Y: 'paper',
		Z: 'scissors',
		rock: 1,
		paper: 2,
		scissors: 3
	};

	function doPart1() {
		let sum = 0;

		for (let line of stratGuideByLines) {
			const letters = line.match(/([A-C])\s([X-Z])/i);

			if (letters) {
				const points = main(letters);

				sum += points.shapeScore;
				sum += points.outcomeScore;
			}
		}

		console.log('part one = ' + sum);// 15523
	}

	function main(letters) {
		let ret = {};

		const opponentPlayed = shapes[letters[1].toUpperCase()];
		const iPlayed = shapes[letters[2].toUpperCase()];
		const opponentShape = shapes[opponentPlayed];
		const myShape = shapes[iPlayed];

		ret.shapeScore = myShape;

		if (opponentPlayed == iPlayed) {
			ret.outcomeScore = scores.draw;// correct
		}
		else if (myShape > opponentShape) {
			if (opponentPlayed == 'rock' && iPlayed == 'scissors') {
				ret.outcomeScore = scores.loss;
			}
			else {
				ret.outcomeScore = scores.win;
			}
		}
		else {
			if (opponentPlayed == 'scissors' && iPlayed == 'rock') {
				ret.outcomeScore = scores.win;
			}
			else {
				ret.outcomeScore = scores.loss;
			}
		}

		return ret;
	}

	function doPart2() {
		let sum = 0;
		let outcomes = {
			X: 'loss',
			Y: 'draw',
			Z: 'win'
		};

		for (let line of stratGuideByLines) {
			const letters = line.match(/([A-C])\s([X-Z])/i);

			if (letters) {
				const opponentPlayed = shapes[letters[1].toUpperCase()];
				const outcome = outcomes[letters[2].toUpperCase()];

				let iPlay = shapes[opponentPlayed];

				if (outcome == outcomes.X) {
					if (opponentPlayed == 'rock') {
						iPlay = shapes.scissors;
					}
					else if (opponentPlayed == 'scissors') {
						iPlay = shapes.paper;
					}
					else {
						iPlay = shapes.rock;
					}
				}
				else if (outcome == outcomes.Z) {
					if (opponentPlayed == 'rock') {
						iPlay = shapes.paper;
					}
					else if (opponentPlayed == 'scissors') {
						iPlay = shapes.rock;
					}
					else {
						iPlay = shapes.scissors;
					}
				}

				sum += iPlay + scores[outcome];
			}
		}

		console.log('part two = ' + sum);// 15702
	}

	doPart1();
	doPart2();
})();