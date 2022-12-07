(() => {
	const fs = require('fs');
	const readline = require('readline');

	function save(files) {
		// files [{name: string, content: string}]

		let fileHandles = [];
		let numSaved = 0;

		function closeFileHandles() {
			for (let i = fileHandles.length - 1; i > -1; i--) {
				const fileHandle = fileHandles.pop();
				fileHandle.close();
			}
		}

		return new Promise(async (resolve, reject) => {
			for (let file of files) {
				const fileHandle = await fs.promises.open(file.name, 'w');

				fileHandles.push(fileHandle);
				fileHandle.writeFile(file.content).then(() => {
					numSaved++;

					if (numSaved == files.length) {
						closeFileHandles();
						resolve();
					}
				}).catch((err) => {
					closeFileHandles();
					reject(err);
				});
			}
		});
	}

	async function readByLines(filename, onNewLine) {
		const rl = readline.createInterface({
			input: fs.createReadStream(filename),
			crlfDelay: Infinity
		});

		for await (const line of rl) {
			onNewLine(line);
		}
	}

	module.exports = {save, readByLines};
})();