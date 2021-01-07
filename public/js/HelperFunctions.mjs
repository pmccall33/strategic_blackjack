// Create enum func
class HelperFunctions {
	constructor() {
	}

	// Takes in an Arr and returns enum-like immutable object of structure
	// { KEY : Symbol(value)}
	createEnumFromArr(Arr) {
		let newEnum = new Object();
		Arr.forEach((e) =>  {
			typeof(e) === 'string' ? newEnum[e.toUpperCase()] = Symbol(`${e}`) : newEnum[e] = Symbol(`${e}`);
		});
		// console.log(newEnum);
		return Object.freeze(newEnum);
	}

	// Takes in an object and returns an enum-like immutable obj of the 
	// structure { KEY : Symbol(value)} 
	createEnumFromObjOfStrings(Obj) {
		let newEnum = new Object;
		for (const prop in Obj) {
			newEnum[`${prop}`.toUpperCase()] = Symbol(`${Obj[prop]}`);
		};
		// console.log(newEnum);
		return Object.freeze(newEnum);
	}
};

const HelperFunctionsInstance = new HelperFunctions;
const shmoo = HelperFunctionsInstance.createEnumFromArr(['Dog', 12, 'Cat', 'Aardvark']);
// shmoo.DOG = '789253'; 
// console.log(shmoo);
// const schmoo2 = HelperFunctionsInstance.createEnumFromObj({'dog': '🐶', 'koala': '🐨', 'alien': '👽'});
// console.log(schmoo2);
// schmoo2.KOALA = 'frog';



export { HelperFunctions };