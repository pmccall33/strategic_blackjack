// # ToDO Wednesday-Thursday
// ##Strat-BJ
// ###✅1. npm express-session vulnerabilities
// 	###https://npmjs.com/advisories/[1203*, 535*, 1469*, 29*, 28*, 8*, 3, 1561, 1500*, 1179*, 1592*, 1556*,1561* ]
// ###2.↗️ finish refactor modularization
// ###3.✅ Seperate frnt/bck? NO
// ###3. player sign-up/ session and review
// ###4. routes

// ##My-cellars
// ###1. Testing/Working?
// ###2. Inventory logic?
// ###3. extend?

// ##WoodStruct
// ###1. Working?

// ##Resume/Job
// ###1. Finish the fucking resume!!!!!!!
// ###2. message to Laurel
// ###3. LinkedIn
// ###4. GitHub review

// ##Study
// ###1. Finnish express tut
// ###2. Arr methods/JS algorithms/cheat sheet
// ###3. Memoization
// ###3. Hackerrank

// let filepath = 'Users/pmccall33/sea-otters/strategic-blackjack/strat-b/Backend';
// let filepathArr = filepath.split('/')
// console.log(filepath.split('/').filter((dir, i) => (i < (filepath.split('/').length - 1))).join('/'));
// console.log(filepath.split('/').length)
// // let filepathArr = filepath.split('/');


// NODE_DEBUG=request node app.js


//Promise handling method funcs --------

// // .then with two callbacks *****
// await this.User.create(userInfo).then(createdUser => {
//     // user was successfully created
//     console.log(createdUser)
//     // business logic goes here
// }, error => {
//     console.error(error) // from creation
// });



// // instance of filter
// try {
//     const createdUser = await this.User.create(userInfo);
//     // user was successfully created
//     console.log(createdUser)
//     // business logic goes here
// } catch (error) {
//     if (error instanceof CreationError) {
//         console.error(error) // from creation
//     } else {
//         throw error;
//     }
// };

// // iterate async but sequence over promise arr
// async function printFiles () {
//   const files = await getFilePaths();

//   await files.reduce(async (promise, file) => {
//     // This line will wait for the last async function to finish.
//     // The first iteration uses an already resolved Promise
//     // so, it will immediately continue.
//     await promise;
//     const contents = await fs.readFile(file, 'utf8');
//     console.log(contents);
//   }, Promise.resolve());
// }
promise handling -

            //   // catch all promise erroris promise.all
            // let promises = [extantUser, createdUser];
            // Promise.all(promises).then(err).catch(console.error(err));

              // // METHOD 2 ??
              // async function promErrCatch (promise) {
              //   Promise.then(promise => [null, promise], err => [err, null]);
              // };

              // promises.map( promise => promErrCatch(promise)).catch(err);

    // Find if username exists
        // Promise.resolve ----
        // const extantUser = await Promise.resolve(User.findOne({ username: req.body.username}))
      //       .then(error).catch(next);

      // create new user from req.body
        // const createdUser =  await Promise.resolve(User.create( userData )).then(
        //   error).catch(next);

      // // better ? -----

        // Separate try/catch for foundUser
          // try {
          //      const foundUser = await User.findOne({ username: req.body.username });
          //      console.log(foundUser, 'foundUser --');

          //       // if user exists send message res and redirect to prompt unique username
          //       let message = req.session.message;

          // } catch (err) {
          //   console.log(err);
          //   next(err);
          // }

          // Separate try/catch for createUser
            // try {
            //     const createdUser = await this.User.create(userInfo);
            //     // user was successfully created
            //     console.log(createdUser)
            //     // business logic goes here
            // } catch (error) {
            //     if (error instanceof CreationError) {
            //         console.error(error) // from creation
            //     } else {
            //         throw error;
            //     }
            // };

