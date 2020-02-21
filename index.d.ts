declare module "args-flagify" {
	enum FlagTypes {
		number = 'number',
		string = 'string',
		boolean = 'boolean'
	}

	type Flags = {
		[flagName: string]: FlagTypes;
	};

	type Flag = {
		[flagName: string]: any;
	};

	type Result = {
		inputs: string[];
		flags: Flag;
		help: string;
		getVersion: function (): void;
	}

	function argsFlagify(help: string, flags: Flags): Result;
	export = argsFlagify;
}
