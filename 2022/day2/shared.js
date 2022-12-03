(() => {
	const fileUtil = require('./fileUtil');

	const scores = {
		win: 6,
		draw: 3,
		loss: 0,
		rock: 1,
		paper: 2,
		scissors: 3
	};

	const shapeNames = {
		A: 'rock',
		B: 'paper',
		C: 'scissors'
	};

	module.exports = {fileUtil, scores, shapeNames};
})();