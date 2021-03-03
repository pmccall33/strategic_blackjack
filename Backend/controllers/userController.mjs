import express 				from 'express';
const router          = express.Router();

// import ejs            from '../node_modules/ejs/ejs.js'
import fs             from 'fs';
import path 					from 'path';
import url 	 					from 'url';
import session        from 'express-session';
import bcrypt         from 'bcryptjs';
import request        from 'superagent';
import luxon         	from 'luxon';
import passString     from '../extra_express/pass.mjs';
import { HelperFunctions } from '../../public/js/HelperFunctions.mjs'

// Import Model/Class schema
import User           from '../models/user.mjs';

const hf = new HelperFunctions();

// To access dirname with ES6 modules w special chars accross platforms
import { dirname } 	      from 'path';
import { fileURLToPath }  from 'url';


// set filepaths to __dir, app and public.
const __dirname = dirname(fileURLToPath(import.meta.url));
// console.log(__dirname, '__dirname ----<<< at userCOntroller');

// Get filepath to app
const appFilepath = __dirname.split('/').filter((dir, i) => (i < (__dirname.split('/').length - 2)))
                          .join('/')
// console.log(appFilepath, 'appFilepath at userController <<-------&&&&');

// get pubFilepath
const pubFilepath = path.join(appFilepath.concat('/public'));
const fp = pubFilepath;
const messageDev = 'Strategic Blackjack is currently under construction but feel free to look around.'


// Func to return filepath to /public dir + arg = 'file'
const fpSet = (file) => `${path.join(appFilepath.concat('/public'), `${file}`)}`;

console.log(fp, ' STR-BLKJK $ - filepath at userController -- ');

// Set public filepath
router.use(express.static(fp));


// async wrapper func
const asyncWrap = route => (req, res, next) =>
  Promise.resolve(route(req, res)).catch(next)



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//                  Login Routes                            //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

router.get('/login', (req, res) => {
  try {
    const message = req.session.message;
    // req.session.message = '';
    res.render(path.join(fp, '/user/login.ejs'), {
        message: message ? message : '',
        userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : '/user/login'
    });
	} catch (err) {
    next(err)
    res.send(err);
  }
});

router.post('/login', async (req, res, next) => {
    // console.log(__dirname, 'dirname ++ POST');
    console.log('POST route hit ------------- /login')
  try {
    const extantUser = await User.findOne({ username: req.body.username });
    if(!extantUser) {
      req.session.message = 'Incorrect username or password. Please try again.';
      res.sendFile(path.join(fp, '/user/login.html'));
    } else {
      if(bcrypt.compareSync(req.body.password, extantUser.password)) {
      const day = (new Date().toLocaleString('en-US', {weekday: 'long'}));
      req.session.message = `Howdy ${extantUser.username}, happy ${day}!`
      req.session.username = extanUser.username
      req.session.loggedIn = true
      req.session.userId = extantUser._id;
      console.log(req.session, ' <----- userController login req.session');
      res.sendFile(path.join(fp, '/index.html'));
      } else {
      req.session.message = 'Incorrect username or password. Please try again.';
      console.log("invalid name and/or password");
      req.session.loggedIn = false;
      res.send('Oops. `Invalid username and/or password.')
      res.redirect('/login');
      }
  }
  } catch (err) {
    throw new Error('Problems logging in');
    res.send(err)
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//                  Register Routes                           //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

router.get('/register', async (req, res) =>  {
   console.log('GET route hit ------------- /register');
   let navMessage = req.session.navMessage;
   let message = req.session.message;

   console.log(req.session, req.session.userBarId, 'session / userBarId');

	if (req.session.message === `Username: '${req.body.username}' already taken!`){
		req.session.message = '';
	}

	try {
		message = req.session.message;
    navMessage = req.session.navMessage;
		req.session.message = '';
    req.session.navMessage = '';

    let sessionData = {
      username: req.session.loggedIn ? req.session.username : '',
      message: message ? message : '',
      messageDev: messageDev,
      navMessage: navMessage ? navMessage : '',
      userBarId: req.session.loggedIn ? `./user/${req.session.userId}`
        : './user/register'
    };

		res.render(path.join(fp, '/user/register'), sessionData );
	} catch (err) {
    throw new Error(err, 'STR-BLKJK $$$ - in GET route user/register');
		res.send(err);
	}
});


router.post('/register', async (req, res, next) => {
  console.log('POST route hit ------------- /register');
  let navMessage = req.session.navMessage;
  let message = req.session.message;

  let sessionData = {};
    try {
      const extantUser = await User.findOne({ username: req.body.username});
      console.log(extantUser, 'estantUser found /register +++++----');
      if (!extantUser) {
          // new userData Obj
          const userData = {
              username: req.body.username,
              password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)),
              email: req.body.email,
              chipstack: 1000,
              playerRating: 30,
              userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : '/user/login'
          };
          const createdUser = await User.create( userData );
          console.log(createdUser.username, 'createdUser in /register +++++++------');


            // create new express session
              const day = (new Date().toLocaleString('en-US', {weekday: 'long'}));

              req.session.username = createdUser.username;
              req.session.userId = createdUser._id;
              req.session.loggedIn = true;
              req.session.message = `Howdy ${createdUser.username}, happy ${day}!`;
              req.session.navMessage = `Logged in as ${createdUser.username}.`;
              navMessage = req.session.navMessage;
              message = req.session.message;

              //redirect to table page
              // console.log(createdUser.password, '<--------- hashedPASS+++++');
              console.log(req.session, '<------session////////session');

              // req.session.message = `Thanks for signing up, ${createdUser.username}!`
              // sessionData = {
                // message : req.session.message,
                // messageDev: messageDev,
                // username : req.session.username,
                // userLogged : req.session.loggedIn,
                // userBarId : req.session.userId
              // };

              console.log('now redirecting....');
              res.redirect('../index');
              // res.render(fpSet('/home'), sessionData);
        }  else {
            req.session.message = `Username: '${req.body.username}' already taken! \n Try again...`;
            message = req.session.message;

            console.log(req.session, 'req session found user');

            sessionData = {
              username:  req.session.username,
              message: message ? message : '',
              navMessage: navMessage ? navMessage : '',
              userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : '/user/login',
              messageDev: messageDev
            }

            res.render(fpSet('/user/register'), sessionData);
        }

    } catch (err) {
      // throw new Error(err.code, err.status, 'Error creating account in /register POST')
      console.log(err);
      res.render(fpSet('/home'), sessionData );
    }
});

// ----------- Logout --------------- //

router.get('/logout', async (req, res, next) => {
	console.log(req.session, ' logout req.session');
    req.session ?
        req.session.message = `Logged out as ${req.session.username}`
      :   req.session.message = 'You are not currently logged in.'

  let data = {  message: req.session.message,
                userBarId: '/user/login',
                messageDev: 'Site under Construction...'   };
  // try {
      console.log('Now redirecting to /home ...')
      req.session.destroy((err) => {
        res.render(fpSet('/user/register'), data);
      });
});

// --------------  Show Route --------------- //

router.get('/:id', async (req, res) => {
	let message = req.session.message;

  try {
		if (req.session) {
			const foundUser =  await User.findById(req.session.userId);

      console.log(foundUser, 'foundUser by id +++++ -----<<<<<');
      sessionData = {
        foundUser: foundUser,
        message: req.session.message,
        messageDev: messageDev,
        userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : 'user/login'
      }

			res.render(fpSet('/home'), sessionData);
		} else {
			res.render(fpSet('/home'));
		}
	} catch (err) {
		res.send(err)
    // throw new Error(err.code, 'Error finding user by :id..');
	}
});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//                    Session Calls                          //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

router.post('/session-data', asyncWrap( async (req, res, next) => {
  let message = req.session.message;
  console.log(JSON.parse(req.body), 'req.body session-data --------session-data')
    // TODO : filter and return passed args with error handle
    let args = req.body;
    let res2 = {};

    // if session exists try to get session attr requested and respond/ else report no current session
    if (session) {
      try {
        // iterate over args and return an object of session attributes
        res = args.forEach(a =>  res.args[a] = 'session.args[a]' );
        res2 = args.map( a => res2.args[a] = 'session.args[a]' );

        // let res1 = args.reduce((acc, cur, i) =>  res.cur : 'session.cur' ),0);
        console.log(res, res2, ' res - forEach ;;;;  map parsed - res.json');
        res.json(res);
      } catch(err) {
        // throw new Error(err.code, 'Error retrieving session data.');
        res.send(err);
        return ;
      }
    } else {
      throw new Error(err.code, 'No current session active.');
      return;
    }
}));








export default router;
