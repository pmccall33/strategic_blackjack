// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//					requirements                       					//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// import *                from './dbs/db.js';
import db               from './dbs/db.js';
import express          from 'express';
import ejs              from 'ejs';
import path             from 'path';
import url              from 'url';
import bodyParser      	from 'body-parser';
import methodOverride  	from 'method-override';
import session         	from 'express-session';
import bcrypt           from 'bcryptjs';
import request         	from 'superagent';
import luxon         		from 'luxon';
import passString      	from './extra_express/pass.mjs';
import userController   from './controllers/userController.mjs';

const app               = express();
const PORT              = process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');



// To access dirname with ES6 modules w special chars accross platforms
import { dirname }       from 'path';
import { fileURLToPath } from 'url';

// __dirname = /Backend
const __dirname = dirname(fileURLToPath(import.meta.url));

// Server parent app path
const filepath = __dirname.split('/').filter((dir, i) => (i < (__dirname.split('/').length - 1)))
                .join('/');

// filepath to app /public dir
const pubFilepath = filepath.concat('/public');

const fp = filepath;

// function to set filepath fpSet() => type String
const fpSet = (file) => `${path.join(appFilepath, `${file}`)}`;
// const filepath = (file) => path.join(appFilepath.concat('/public'), `${file}`);

// filepath = /strategicb-blackjack
console.log(filepath, '&&---- STR-BLKJK : - filepath');
const messageDev = 'Strategic Blackjack is currently under construction but fell free to look around.'

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// 						Middleware						 										//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

app.use(session({

  secret: passString,
	resave: false,
	saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(filepath, 'public')));


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	//
//						controllers						  											//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

app.use('/user', userController);


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//							routes																			 //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
let sessionData;


app.get('/', (req, res, next) => {
    let message = req.session.message;
    let navMessage = req.session.navMessage;
    req.session.message = '';
    let userLogged = req.session.loggedIn;

    console.log(' STR-BLKJK --  app.get - route -');
  try {
    sessionData =  {
        username: req.session.loggedIn ? req.session.username : '',
        userLogged: req.session.loggedIn ? req.session.loggedIn : false,
        userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : '/user/login',
        navMessage: navMessage ? navMessage : '',
        message: message ? message : '',
        messageDev: messageDev
    }

    res.render(path.join(pubFilepath, '/home'), sessionData);
  } catch (err) {
      console.log('$TR-BLKJK- : No current session data found.')
      res.redirect('/home');
  }
});

app.get('/index', (req, res, next) => {
  let message = req.session.message;
  let navMessage = req.session.navMessage;
  let userLogged = req.session.loggedIn;

  console.log('/index get path hit...');
  try {
    sessionData =  {
      username: req.session.loggedIn ? req.session.username : '',
      userLogged: req.session.loggedIn ? req.session.loggedIn : false,
      userBarId: req.session.loggedIn ? `/user/${req.session.userId}` : '/user/login',
      navMessage: navMessage ? navMessage : '',
      message: message ? message : '',
      messageDev: messageDev
    };

    res.render(path.join(pubFilepath, '/index'), sessionData);
  }
  catch (err) {
    throw new Error(err.code, 'Sorry, cannot render table view at the mement.');
    next(err);
    res.render(path.join(pubFilepath, '/home'));
  }
});

app.get('/about', (req, res, next) => {
  let message = req.session.message;

  try {
    res.sendFile(filepath, '/about');
  }
  catch (err) {
    throw new Error(err.code, 'Sorry, file is hiding.');
    next(err);
    res.sendFile(filepath, '/homex');
  }
});



// // superagent promise with async/await
// (async () => {
//   try {
//     const res = await superagent.post('/api/pet');
//     console.log(res);
//   } catch (err) {
//     console.error(err);
//   }
// })();


// request.get('/home', (err, res) => {
//   try {
//     assert.strictEqual(res.statusCode, 200);
//     done();
//   } catch (err_) {
//     done(err_);
//   }
// });

// should set the header fields
// request
//   .post(`${uri}/echo`)
//   .set({ 'X-Foo': 'bar', 'X-Bar': 'baz' })
//   .end((err, res) => {
//     try {
//       assert.equal('bar', res.header['x-foo']);
//       assert.equal('baz', res.header['x-bar']);
//       done();
//     } catch (err_) {
//       done(err_);
//     }
//   });
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
//                    listeners                               //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

app.listen(PORT, () => {
  console.log(`Server now running on ${PORT}`);
});



