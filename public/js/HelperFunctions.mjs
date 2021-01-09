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

// set up a promise return for setTimeout - HelperFuncs

  const timeout = async (ms) => {
    await new Promise(resolve => setTimeout(resolve, ms));
    console.log('waited...');
  }

  const delayFade = async (fn, msg, ms) => {
    console.log('waiting...');
    await timeout(ms);
    console.log('...waited');
    return fn(msg, ms);
  }

  const fadeInMessage = (message) => {
    setTimeout(() => {  
      console.log('fadeInM called/////')
      messageLeft.fadeIn('slow');
      messageLeft.html(`${message}`);
    }, 2000);
  }
// Use
  // delayFade(fadeInMessageLeft, message, 3000);


export { HelperFunctions };