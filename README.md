# args-flagify

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
      --radius Enter your radius

    Examples
      $ your-cli firstInput --radius 2.45
`, {
    radius: 'number'
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
      --radius Enter your radius

    Examples
      $ your-cli firstInput --radius 2.45
```

```
$ your-cli --version
// output
1.0.3
```

## API

### argsFlagify(help, flags)

Returns an object with:

-   `inputs` (Array) - the inputs before the flags
-   `flags` (Object) - flags (the key is the flag name, the value is the flag value of type: `string`, `number` or `boolean`)
-   `help` (string) - the help text used with `--help`
-   `version` (string) - the version of your CLI

#### help

Type: `string`

The help text for your CLI.

#### flags

Type: `Object`

The flags to parse. The key is the flag name, the value is the flag type: `number, string, boolean`.

Example:

```
argsFlagify(`
    help text
`, {
    radius: 'number',
    firstName: 'string'
});
```
