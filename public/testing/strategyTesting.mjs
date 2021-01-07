// import { Deck }    			from '../js/classes/Deck.mjs';
// import { Strategy } 		from '../js/classes/Strategy.mjs';
import { HelperFunctions } 	from '../js/HelperFunctions.mjs';


const strategyTesting = {

	localHelperFunctions: new HelperFunctions(),
	cardRanks: ['A','K','Q','J', 10, 9, 8, 7, 6, 5, 4, 3, 2],
	playerPossibleHands: [],
	dealerPossibleUpCards: [],
	playerHandsEnum: {},
	playerHandsVsDealerObj: {},

	createPossiblePlayerHands() {
		for (let card in this.cardRanks) {
			for (let i = card; i < this.cardRanks.length; i++) {
				this.playerPossibleHands.push([this.cardRanks[card], this.cardRanks[i]]);
			};
		};
	 	this.playerHandsEnum =  this.localHelperFunctions.createEnumFromArr(this.playerPossibleHands);
		// console.log(this.playerPossibleHands, this.playerHandsEnum, this.playerPossibleHands.length);
		return this.playerPossibleHands, this.playerHandsEnum; 
	},

	createPossibleDealerUpCards() {
		possibleDealerUpCards = [...cardRanks];
	},

	// Get possible combinations of hands vs possible dealer up cards
	createPlayerHandVsDealerUpCardObj() {
		let i = 0;

		for (let hand in this.playerPossibleHands) {
			for (let card in this.cardRanks) {
				this.playerHandsVsDealerObj[i] = [ this.playerPossibleHands[hand], this.cardRanks[card]];
				i++;
			};
		};
		// console.log(this.playerHandsVsDealerObj);
		return this.playerHandsVsDealerObj;
	},



};

const playerHands = strategyTesting.createPossiblePlayerHands();
const handsVsDealerCard = strategyTesting.createPlayerHandVsDealerUpCardObj();








export { strategyTesting };








