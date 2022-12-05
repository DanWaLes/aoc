(function() {
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

	function load(filenames) {
		// filenames [] of string

		let fileHandles = [];
		let loadedFiles = {
			files: {},
			length: 0
		};

		function closeFileHandles() {
			for (let i = fileHandles.length - 1; i > -1; i--) {
				const fileHandle = fileHandles.pop();
				fileHandle.close();
			}
		}

		return new Promise(async (resolve, reject) => {
			for (let filename of filenames) {
				const fileHandle = await fs.promises.open(filename, 'r');

				fileHandle.readFile('utf8').then((content) => {
					if (filename.match(/\.json$/)) {
						content = JSON.parse(content);
					}

					loadedFiles.files[filename] = content;
					loadedFiles.length++;

					if (loadedFiles.length == filenames.length) {
						closeFileHandles();
						resolve(loadedFiles.files);
					}
				}).catch((err) => {
					closeFileHandles();
					reject(err);
				});
			}
		});
	}

	async function readByLines(filename, onNewLine) {
		// ignores empty last line

		const rl = readline.createInterface({
			input: fs.createReadStream(filename),
			crlfDelay: Infinity
		});

		for await (const line of rl) {
			onNewLine(line);
		}
	}

	module.exports = {save, load, readByLines};
})();