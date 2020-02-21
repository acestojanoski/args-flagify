# args-flagify

> nodejs CLI helper with zero dependencies

Inspired by [Sindre Sorhus](https://github.com/sindresorhus) and his beautiful package [meow](https://github.com/sindresorhus/meow).

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
    getVersion: [Function: getVersion]
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
- `inputs` (Array) - the inputs before the flags
- `flags` (Object) - flags (the flag name is the key, the value is the flag value)
- `help` (string) - the help text used with `--help`
- `getVersion` (Function) - function to get the version of your CLI

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
