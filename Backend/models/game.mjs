import mongoose 	 from 'mongoose';
import User 	     from './user.mjs';



const gameSchema = new mongoose.Schema({
		username: String,
		date: { type: Date, default: Date.now },
    hidden: Boolean,
		game: [Object]
});

const Game = new mongoose.model('Game', gameSchema);

export default Game;
