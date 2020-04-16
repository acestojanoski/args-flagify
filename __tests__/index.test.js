const test = require('ava');
const argsFlagify = require('..');

test('should throw an error if help argument is not a string', t => {
	t.throws(
		() => {
			argsFlagify(4);
		},
		{instanceOf: TypeError},
		'`help` argument should be a string'
	);
});

test('should throw an error if flags argument is not an object', t => {
	t.throws(
		() => {
			argsFlagify('some help text', 4);
		},
		{instanceOf: TypeError},
		'`flags` argument should be an object.'
	);
});
