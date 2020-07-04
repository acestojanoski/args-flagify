'use strict';

const path = require('path');
const fs = require('fs');
const {flagTypes} = require('./constants');

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
		return getVersion(path.resolve(directoryPath, '..'));
	}
};

const toString = value => Object.prototype.toString.call(value);
const isString = value => toString(value) === '[object String]';
const isObject = value => toString(value) === '[object Object]';

const parseNumber = (value, flag) => {
	const number = parseFloat(value);

	if (isNaN(number)) {
		throw new TypeError(`The value of --${flag} is not a number.`);
	}

	return number;
};

const parseBoolean = (value, flag) => {
	if (!value || value.startsWith('--') || value.startsWith('-')) {
		return true;
	}

	if (value === 'true' || value === 'false') {
		return value === 'true';
	}

	throw new TypeError(`The value of --${flag} is not a boolean.`);
};

const argsFlagify = (help, flags = {}) => {
	if (!isString(help)) {
		throw new TypeError('`help` argument should be a string');
	}

	if (!isObject(flags)) {
		throw new TypeError('`flags` argument should be an object.');
	}

	const args = process.argv.slice(2);
	const version = getVersion() || '';

	if (args.length === 1 && args[0] === '--help') {
		console.log(help);
		process.exit();
	}

	if (args.length === 1 && (args[0] === '--version' || args[0] === '-v')) {
		console.log(version);
		process.exit();
	}

	const parsedFlags = {};
	const aliases = [];
	const unconvertedValues = [];

	Object.keys(flags).forEach(flag => {
		const options = isObject(flags[flag])
			? flags[flag]
			: {type: flags[flag]};

		const flagIndex = args.indexOf(`--${flag}`);
		const aliasIndex = args.indexOf(`-${options.alias}`);

		if (flagIndex !== -1 && aliasIndex !== -1) {
			throw new TypeError(`Same flag --${flag} provided more then once.`);
		}

		if (aliasIndex !== -1) {
			aliases.push(options.alias);
		}

		const finalFlagIndex = flagIndex !== -1 ? flagIndex : aliasIndex;

		if (!flagTypes.includes(options.type)) {
			throw new TypeError(
				`undefined type of flag. Flag types: ${flagTypes.toString()}`
			);
		}

		if (finalFlagIndex === -1 && options.default === undefined) {
			return;
		}

		let value = `${options.default}`;

		if (finalFlagIndex !== -1) {
			value = args[finalFlagIndex + 1];
		}

		unconvertedValues.push(value);

		if (options.type === 'number') {
			parsedFlags[flag] = parseNumber(value, flag);
		}

		if (options.type === 'string') {
			if (!value) {
				throw new TypeError(`The value of --${flag} is not a string.`);
			}

			parsedFlags[flag] = value;
		}

		if (options.type === 'boolean') {
			parsedFlags[flag] = parseBoolean(value, flag);
		}
	});

	const inputs = args.filter(item => {
		if (
			aliases.includes(item.slice(1)) ||
			unconvertedValues.includes(item) ||
			Object.keys(flags).includes(item.slice(2))
		) {
			return false;
		}

		return true;
	});

	return {
		inputs,
		flags: parsedFlags,
		help,
		version,
	};
};

module.exports = argsFlagify;
