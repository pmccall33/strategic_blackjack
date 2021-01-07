// Create enum func
const createEnum = function(Arr) {
	const newEnum = Object.freeze({
		// Arr.forEach((e) => e.toUpperCase(): Symbol(`${e}`));
		for (let e in Arr) {
			e.toUpperCase(): Symbol(`${e}`);
		}
	};
};

createEnum(['Dog', 'Cat', 'Aardvark']);

export default;