# args-flagify

[![CircleCI](https://circleci.com/gh/acestojanoski/args-flagify/tree/master.svg?style=svg)](https://circleci.com/gh/acestojanoski/args-flagify/tree/master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![install size](https://packagephobia.now.sh/badge?p=args-flagify)](https://packagephobia.now.sh/result?p=args-flagify)
[![Downloads](https://img.shields.io/npm/dm/args-flagify.svg)](https://npmjs.com/args-flagify)

> Node.js CLI helper with zero dependencies

Inspired by [Sindre Sorhus](https://github.com/sindresorhus) and his beautiful CLI helper [meow](https://github.com/sindresorhus/meow).

## Install

```
$ npm install --save args-flagify
```

## Usage

```
$ your-cli firstInput --radius 2.45
```

```
#!/usr/bin/env node

const argsFlagify = require('args-flagify');

const cli = argsFlagify(`
    Usage
      $ your-cli <input>

    Flags
      --radius, -r Enter your radius

    Examples
      $ your-cli firstInput --radius 2.45
      $ your-cli firstInput -r 2.45
`, {
    radius: {
    	type: 'number',
		alias: 'r'
    }
})

console.log(cli);
/* output
{
    inputs: ['firstInput'],
    flags: {
        radius: 2.45
    },
    help: '\n' +
      '    Usage\n' +
      '      $ your-cli <input>\n' +
      '\n' +
      '    Flags\n' +
      '      --radius Enter your radius\n' +
      '\n' +
      '    Examples\n' +
      '      $ your-cli firstInput --radius 2.45\n',
    version: 1.0.1
}
*/
```

```
$ your-cli --help
// output
    Usage
      $ your-cli <input>

    Flags
      --radius, -r Enter your radius

    Examples
      $ your-cli firstInput --radius 2.45
      $ your-cli firstInput -r 2.45
```

```
$ your-cli --version
$ your-cli -v
// output
1.0.3
```

## API

### argsFlagify(help, flags?)

Returns an object with:

-   `inputs` (Array) - Non flag arguments
-   `flags` (Object) - flags (the key is the flag name, the value is the flag value of type: `string`, `number` or `boolean`)
-   `help` (string) - the help text used with `--help`
-   `version` (string) - the version of your CLI

#### help

Type: `string`

The help text for your CLI.

#### flags

Type: `Object`

The flags to parse.

The key is the flag name.

The value is the flag type: `number, string, boolean`, or an object with the flag options:

-   `type`: Type of the value. (Possible values: `string`, `boolean`, `number`)
-   `alias`: Short flag alias.

Example:

```
argsFlagify(`
    ...

    help text

    ...
`, {
    radius: 'number',
    firstName: {
		type: 'string',
		alias: 'fn'
	}
});
```

## LICENSE
MIT
