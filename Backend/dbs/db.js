// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// requires                                            //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

import mongoose from 'mongoose';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// database connection                                 //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const connectionStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1/blkjk';
 
mongoose.connect(connectionStr, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// listeners                                           //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
 
db.on('connected', () => {
  console.log('Now connected to: ', connectionStr);
});

db.on('disconnected', () => {
  console.log('Now disconnected from: ', connectionStr);
});

db.on('error', err => {
  console.log('error', console.error.bind(console, 'MongoDB connection error:'));
});

export default db