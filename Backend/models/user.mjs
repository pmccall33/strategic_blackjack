import mongoose 	from 'mongoose';
import Game 		  from './game.mjs';


const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: false 
	},
	playerRating: Number,
	chipStack: Number,		
	Games: [Game.schema]
});

const User = new mongoose.model('User', userSchema);


export default User;