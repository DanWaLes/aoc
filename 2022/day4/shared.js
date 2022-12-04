(() => {
	const fileUtil = require('./fileUtil');
	
	function readPair(line) {
		let elf1 = line.match(/^(\d+)\-(\d+)/);
		let elf2 = line.match(/(\d+)\-(\d+)$/);

		elf1 = [parseInt(elf1[1]), parseInt(elf1[2])];
		elf2 = [parseInt(elf2[1]), parseInt(elf2[2])];

		return {elf1: elf1, elf2: elf2};
	}

	module.exports = {fileUtil, readPair};
})();