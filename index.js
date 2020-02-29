const path = require('path');
const fs = require('fs');

const getVersion = (directoryPath = path.dirname(module.parent.filename)) => {
	const packageJsonPath = path.join(directoryPath, 'package.json');

	if (fs.existsSync(packageJsonPath)) {
		let version;
		const packageJson = require(packageJsonPath);

		if (packageJson && packageJson.version) {
			version = packageJson.version;
		}

		return version;
	}

	const {root} = path.parse(directoryPath);

	if (root !== directoryPath) {
		getVersion(path.resolve(directoryPath, '..'));
	}
};

const isString = value =>
	Object.prototype.toString.call(value) === '[object String]';

const isObject = value =>
	Object.prototype.toString.call(value) === '[object Object]';

const parseNumber = (value, flag) => {
	const number = parseFloat(value);

	if (isNaN(number)) {
		throw new TypeError(`The value of --${flag} is not a number.`);
	}

	return number;
};

const parseBoolean = (value, flag) => {
	if (!value || value.startsWith('--')) {
		return true;
	}

	if (value === 'true' || value === 'false') {
		return value === 'true';
	}

	throw new TypeError(`The value of --${flag} is not a boolean.`);
};

const flagTypes = ['number', 'string', 'boolean'];

const parseFlag = (args, flags, parsedFlags) => {
	return flag => {
		const indexOfFlag = args.indexOf(`--${flag}`);

		if (indexOfFlag !== -1) {
			const flagType = flags[flag];

			if (!flagTypes.includes(flagType)) {
				throw new TypeError(
					`undefined type of flag. Flag types: ${flagTypes.toString()}`
				);
			}

			const value = args[indexOfFlag + 1];

			switch (flagType) {
				case 'number': {
					parsedFlags[flag] = parseNumber(value, flag);
					break;
				}

				case 'string': {
					if (!value) {
						throw new TypeError(
							`The value of --${flag} is not a string.`
						);
					}

					parsedFlags[flag] = value;
					break;
				}

				case 'boolean': {
					parsedFlags[flag] = parseBoolean(value, flag);
					break;
				}
			}
		}
	};
};

const argsFlagify = (help, flags = {}) => {
	if (!isString(help)) {
		throw new TypeError('help argument should be a string');
	}

	if (!isObject(flags)) {
		throw new TypeError('flags argument should be an object.');
	}

	const args = process.argv.slice(2);
	const version = getVersion() || '';

	if (args.length === 1 && args[0] === '--help') {
		console.log(help);
		process.exit();
	}

	if (args.length === 1 && args[0] === '--version') {
		console.log(version);
		process.exit();
	}

	const parsedFlags = {};

	try {
		Object.keys(flags).forEach(parseFlag(args, flags, parsedFlags));
	} catch (error) {
		console.error(error);
		return;
	}

	const firstFlag = args.find(arg => arg.startsWith('--'));
	const inputs = args.slice(
		0,
		firstFlag ? args.indexOf(firstFlag) : args.length
	);

	return {
		inputs,
		flags: parsedFlags,
		help,
		version,
	};
};

module.exports = argsFlagify;
