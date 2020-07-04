declare module 'args-flagify' {
	type FlagType = 'number' | 'string' | 'boolean';

	type Flag = {
		type: FlagType;
		alias: string;
		default: number | string | boolean;
	};

	type Flags = {
		[flagName: string]: Flag | FlagType;
	};

	type ParsedFlags = {
		[flagName: string]: number | string | boolean;
	};

	type Result = {
		inputs: string[];
		flags: ParsedFlags;
		help: string;
		version: string;
	};

	function argsFlagify(help: string, flags: Flags): Result;
	export = argsFlagify;
}
