// Create enum func
class HelperFunctions {
	constructor() {

  	// Takes in an Arr and returns enum-like immutable object of structure
  	// { KEY : Symbol(value)}
  	this.createEnumFromArr = (Arr) => {
  		let newEnum = new Object();
  		Arr.forEach((e) =>  {
  			typeof(e) === 'string' ? newEnum[e.toUpperCase()] = Symbol(`${e}`) : newEnum[e] = Symbol(`${e}`);
  		});
  		// console.log(newEnum);
  		return Object.freeze(newEnum);
  	}

  	// Takes in an object and returns an enum-like immutable obj of the
  	// structure { KEY : Symbol(value)}
  	this.createEnumFromObjOfStrings = (Obj) => {
  		let newEnum = new Object;
  		for (const prop in Obj) {
  			newEnum[`${prop}`.toUpperCase()] = Symbol(`${Obj[prop]}`);
  		};
  		// console.log(newEnum);
  		return Object.freeze(newEnum);
  	}

    this.timeout =  async (ms) => {
      await new Promise(resolve => setTimeout(resolve, ms));
      console.log(`awaited... ${ms}.`);
    }

    this.delayFade = async (fn, msg, ms) => {
      await timeout(ms);
      console.log(`awaited... ${ms}.`);
      return fn(msg, ms);
    }

    this.fadeInMessage = (message) => {
      setTimeout(() => {
        messageLeft.fadeIn('slow');
        messageLeft.html(`${message}`);
      }, 2000);
    }

    // async func wrapper
    this.asyncWrap = (route) => (req, res, next = console.error) => {
      Promise.resolve(route(req, res)).catch(next);
    }

    // Promise err catch function
    this.promErrCatch = async (Promise) =>  {
      Promise.then(data => [null, data], err => [err, null]);
    }
  }
};
// const HelperFunctions = new HelperFunctions();

export { HelperFunctions };
