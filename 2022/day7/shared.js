(() => {
	const fileUtil = require('./fileUtil');

	function prettyPrint(obj) {
		let indent = '';
		let str = '';

		function main(obj) {
			if (Array.isArray(obj)) {
				str += '[';

				for (let i = 0; i < obj.length; i++) {
					const val = obj[i];

					if (val && typeof val == 'object') {
						indent += '\t';
						str += '\n' + indent;
						main(val);
						indent = indent.replace(/^\t/, '');
					}
					else {
						main(val);
					}

					if (i + 1 < obj.length) {
						str += ',';
					}
				}

				if (obj.length) {
					str += '\n' + indent;
				}

				str += ']';
			}
			else if (obj && typeof obj == 'object') {
				str += '{';
				indent += '\t';

				const keys = Object.keys(obj);

				for (let i = 0; i < keys.length; i++) {
					const key = keys[i];
					str += '\n' + indent + '"' + key + '": ';
					const val = obj[key];

					main(val);

					if (i + 1 < keys.length) {
						str += ',';
					}
				}

				indent = indent.replace(/^\t/, '');

				if (keys.length) {
					str += '\n' + indent;
				}

				str += '}';
			}
			else {
				str += JSON.stringify(obj);
			}
		}

		main(obj);

		return str;
	}

	module.exports = {fileUtil, prettyPrint};
})();
