interface IFlag {
    [flag: string]: string | boolean
}

interface IFlagified {
    inputs: string[],
    flags: IFlag
}

const argsFlagify = (help: string, flags: string[] = []): IFlagified => {
    const args: string[] = process.argv.slice(2);
    let inputs: string[] = [];
    let parsedFlags: IFlag = {};

    if (args.length === 1 && args[0] === "--help") {
        console.log(help);
        process.exit();
    }

    flags.forEach((flag: string) => {
        const indexOfFlag: number = args.indexOf(`--${flag}`);

        if (indexOfFlag !== -1) {
            const value: string = args[indexOfFlag + 1];

            if (!value) {
                parsedFlags[flag] = true;
                return;
            }

            if (value.startsWith("--")) {
                parsedFlags[flag] = true;
                return;
            }

            parsedFlags[flag] = value;
        }
    });

    if (Object.keys(parsedFlags).length === 0) {
        inputs = args.filter(input => !input.startsWith("--"));
    } else {
        const firstFlag: string | undefined = args.find(arg => arg.startsWith("--"));
        const firstFlagIndex = firstFlag ? args.indexOf(firstFlag) : 0;
        inputs = args.slice(0, firstFlagIndex);
    }

    return {
        inputs: inputs,
        flags: parsedFlags
    };
}

export default argsFlagify;
module.exports = argsFlagify;
