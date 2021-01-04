import { HelperFunctions } 	from '../HelperFunctions.mjs';
import { Player }			from './Player.mjs';
const localHelperFunctions = new HelperFunctions();

/*  <<<======================================================>>>
							Strategy Class
	<<<======================================================>>> */

class Strategy {
	constructor() {
		this.playerHand = [],
		this.playerHandValue = 0,
		this.dealerUpCardValue = 0,			
		this.currentOdds = 48.3,
		this.currentCountOdds = 0,
		this.playerBustOdds = 0,
		this.playerBustRating = localHelperFunctions.createEnumFromObjOfStrings({
			'great' : ' 👍 💰 Go for it. Zero odds of busting.',
			'good' : ' ✅ Pretty darn Good.',
			'average' : ' ↔️ Just about even odds.',
			'fair' : ' ⚠️ Cuidado, Not so swell.',
			'poor' : '  ❌ Wouldn\'t advise it.' 
		})
		// this.playerBustRating = Object.freeze({
		//     GREAT:   Symbol(' 👍🏾 💰Great! Zero odds of busting.'),
		//     GOOD:  Symbol(' ✅ Pretty darn Good.'),
		//     AVERAGE: Symbol(' ↔️ So-so to Average. '),
		//     FAIR: Symbol(' ⚠️ Just Fair to Middling. '),
		//     POOR: Symbol(' ❌ Looking Poor.'),
		// })
	}

	// Basic Strategy Chart to get correct play upon initial deal
	getBasicStrategicPlay(player, dealer) {
		this.player = player;
		// Update player data
		// this.player.handValue(player);

		this.playerHand = player.currentHand;
		this.playerHandValue = player.currentTally;
		this.dealerUpCardValue = dealer.currentHand[0].value;			

		// console.log(player, '--player in getStrategy');
		// console.log(dealer, '--dealer in getStrategy');
		
		// Compare player hand to dealer up card for 'correct' play based on basic strategy
		
		// Player has blackjack
		if (this.playerHandValue === 21) {
			return 'Hey Buddy, you got 21. Might as well Stand Pat.';
		};

		/* Player has a pair, compare to dealer up card for split/double strategy*/
		if (this.playerHand[0].rank === this.playerHand[1].rank) {
			// console.log(this.dealerUpCardValue, ' dealerUpcard in pair');
			switch (this.playerHand[0].value) {   				// switch 1
				case 8:
				case 11:
					return 'Split Your Hand';
					break;
				case 5:
				case 10:
					return 'I Wouldn\'t Split Now.';
					break;
				case 7:
					return this.dealerUpCardValue < 8 ? 'Split your Cards.' : 
						'I Would\'nt Split these Cards.';
					break;
				case 9:
					switch (this.dealerUpCardValue) {
						case 7:
						case 10:
						case 11:
							return 'Nope. You should\'t Split Now';
							break;
						case 2:
						case 3:
						case 4:
						case 5:
						case 6:
						case 8:
						case 9:
							return 'Yup, Split \'em';
							break;
					};
					// if (this.dealerUpCardValue === 7 || 10 || 11) {
					//			return 'Don\'t Split';
					// } else if (this.dealerUpCardValue === 2 || 3 || 4 || 5 || 6 || 8 || 9) {
					//			return 'Split Em';
					// };
					break;
				case 2:
				case 3:
				case 4:
					switch (this.dealerUpCardValue) {
						case 8:
						case 9:
						case 10:
						case 11:
							return 'Nah, Don\'t Split';
							break;
						case 2:
						case 3:
						case 4:
						case 5:
						case 6:
						case 7:
							return 'Split This Up';
							break;
					};
					// if (this.dealerUpCardValue === 2 || 3 || 4 || 5 || 6 || 7) {
					/////			return 'Split \'em';
					// } else if (this.dealerUpCardValue === 8 || 9 || 10 || 11) {
					/////			return 'Don\'t Split';
					// };
					break;
				case 6:
					return this.dealerUpCardValue < 7 ? 'Split This, Pardner' : 'Don\'t Split Now';

					// if (this.dealerUpCardValue === 2 || 3 || 4 || 5 || 6) {
					////			return 'Split \'em';
					// } else if (this.dealerUpCardValue === 7 || 8 || 9 || 10 || 11) {
					////			return 'Don\'t Split';
					// };
					break;
				case 4:
					return (this.dealerUpCardValue === 5 || this.dealerUpCardValue === 6) ? 'Split Your Hand, Dude' : 'Nope, Don\'t Split Here';
					break;

					// if ((this.dealerUpCardValue === 5) || (this.dealerUpCardValue === 6)) {
					////			return 'Split';
					// } else if (this.dealerUpCardValue === 2 || 3 || 4 || 7 || 8 || 9 || 10 || 11) {
					////			return 'Don\'t Split';
					// };
					break;
				default:
					console.log(this.playerHand, this.dealerUpCardValue,'Sorry, Error getting strategy in switch1-pairs');
					break;
			};  											// end switch 1

			// console.log(this.correctPlay, 'correctPlay with a pair');
			return this.correctPlay;
		};  									// end if stmnt for pairs.

		// Player has one ace. (soft totals).

		if (player.playerHasAce) {
			console.log(player.playerHasAce, 'playerHasAce in soft totals');
			switch (this.playerHandValue) {     // switch 2
				case 21:
					return 'You got 21, Buddy. Relax and take your dough.';
					break;
				case 20:
					return 'You should Stay';
					break;
				case 19:
					return this.this.dealerUpCardValue === 6 ? 'Double Down!' : 'Stand Pat';

					// if (this.dealerUpCardValue === 6) {
					///			return 'Double Down!';
					// } else {
					///			return 'Stay';
					// };
					break;
				case 18:
					return this.dealerUpCardValue < 7 ? 'Double Down Here' 
						: this.dealerupCardValue === 7 ? 'You should Stay' 
						: this.dealerUpCardValue === 8 ? 'Hit now' :
							 'You should Stay';

					// if (this.dealerUpCardValue === 2 || 3 || 4 || 5 || 6) {
					//			return 'Double Down';
					// } else if (this.dealerUpCardValue === 7 || 8) {
					//			return 'Stay';
					// } else {
					//			return 'Hit';
					// };
					break;
				case 17:
					return (this.dealerUpcardValue === 2 || 6 < this.dealerUpCardValue) ? 'Hit on this' : 'Double Down, My Friend'
					
					// if (this.dealerUpCardValue === 2 || 7 || 8 || 9 || 10 || 11) {
					//			return 'Hit';
					// } else {
					//			return 'Double Down';
					// };
					break;
				case 15:
				case 16:
					return ( 3 < this.dealerUpCardValue < 7 ) ? 'Double it Up' : 'Hit';

					// if (this.dealerUpCardValue === 4 || 5 || 6) {
					//			return 'Double Down';
					// } else {
					//			return 'Hit';
					// };
					break;
				case 13:
				case 14:
					return ( this.dealerUpCardValue === 5 || this.dealerUpCardValue === 6 ) ? 'Double' : 'Hit it';

					// if (this.dealerUpCardValue === 5 || 6) {
					//			return 'Double Down';
					// } else {
					//			return 'Hit';
					// };
					break;
				default:
					console.log('Error getting strategy in switch 2-softTotals');
					break;
			};  							// end soft total switch
			console.log(this.correctPlay, ' - for soft total');
			return this.correctPlay;
		}; 									// End if for one ace/soft hands.

		// No pair/No ace in players hand. (Hard totals).
		if ((this.playerHand[0] !== this.playerHand[1]) && (!player.playerHasAce)) {
			if (( 0 < this.playerHandValue ) && ( this.playerHandValue <= 8 )) {
				return 'Hit';
			};

			if (( 17 < this.playerHandValue ) && ( this.playerHandValue <= 21 )) {
				return 'Stay';
			};

			if (this.dealerUpCardValue === 10 || 11) { 
				switch (this.playerHandValue) {   				// switch 3
					case 17: 
						return 'Stay';
						break;
					case 8:
					case 9:
					case 10:
					case 12: 
					case 13: 
					case 14: 
					case 15:
					case 16:
						return 'Hit';
						break;
					case 11:
						return 'Double Down';
						break;
					default:
						console.log('Error getting strategy in switch 3-hardTotals.');
						break;
				};
			} else if ( 7 <= this.dealerUpCardValue && this.dealerUpCardValue <= 9 ) {
				switch (this.playerHandValue) {  				// switch 4
					case 17: 
						return 'Stand Pat';
						break; 
					case 8:
					case 9:
					case 12:
					case 13:
					case 14:
					case 15:
					case 16:
						return 'Hit Here';
						break;
					case 10:
					case 11:
						return 'Double Down!!';
						break;
					default:
						console.log('Error getting strategy from switch 4-hardTotals');
						break;
				};
			} else if ( 4 <= this.dealerUpCardValue && this.dealerUpCardValue <= 6 ) {
				switch (this.playerHandValue) {  				// switch 5
					case 12:
					case 13:
					case 14:
					case 15:
					case 16:
					case 17:
						return 'Stay'; 
						break;
					case 8:
						return 'Thats a Hit Hand';
						break;
					case 9:
					case 10:
					case 11:
						return 'Double Your Bet';
						break;
					default:
						console.log('Error getting strategy from switch 5-hardTotals');
						break;
				};
			} else if (this.dealerUpCardValue === 3) {
				switch (this.playerHandValue) {   				// switch 6
					case 13:
					case 14:
					case 15:
					case 16:
					case 17:
						return 'Stay on this';
						break; 
					case 8:
					case 12:
						return 'Hit Me';
						break;
					case 9: 
					case 10:
					case 11: 
						return 'Double';
						break;
					default: 
						console.log('Error getting strategy from switch 6-hardTotals');
						break;
				};
			} else if ( this.dealerUpCardValue === 2 ) {
				switch (this.playerHandValue) {   					// switch 7
					case 13:
					case 14:
					case 15:
					case 16:
					case 17:
						return 'Stay'; 
						break;
					case 8:
					case 9:
					case 10:
						return 'Hit';
						break;
					case 10:
					case 11:
						return 'Double Down';	
						break;
					default:
						console.log('Error getting strategy from switch 7-hardTotals');
						break;
				};
			}; 	
		}; 									// end if hardTotals/ no ace
		return 'Error in getting Strategy';
	} 											// end getBasicStrategicPlay()

	getOdds(player, dealer, countedCardsArr, currentCountOdds) {
		let dealerUpCardValue = dealer.currentHand[0].value;
		// currentCountOdds = 0;
		// let countedCardsArr = countedCardsArr;
		let playerHand = player.currentTally;
		let playerBustOdds = 0;
		// let handOdds = currentCountOdds += currentCountOdds

		// this.player.playerHandValue = player.currentTally;
		// Get odds against dealerUpCard
		const getDealerUpCardOdds = function() {	
			switch (dealerUpCardValue) {			// DealerUpCard switch
				case 11:
					currentCountOdds -= 16.0;
					break;
				case 10:
					currentCountOdds -= 16.9;
					break;
				case 9:
					currentCountOdds -= 4.3;
					break;
				case 8:
					currentCountOdds += 5.4;
					break;
				case 7:
					currentCountOdds += 14.3;
					break;
				case 6:
					currentCountOdds += 23.9;
					break;
				case 5:
					currentCountOdds += 23.2;
					break;
				case 4:
					currentCountOdds += 18.0;
					break;
				case 3:
					currentCountOdds += 13.4;
					break;
				case 2: 
					currentCountOdds += 9.8;
					break;
				default:
					currentCountOdds = 0;
					console.log('Error in getOdds switch, try again later.');
					break;
			};
			return currentCountOdds;		 								
		};										// End dealerUpCardOdds()

		// Adjust and display odds for dealt/counted cards
		const adjustOddsForCountedCards = (currentCountOdds) => {
			countedCardsArr.forEach( e => {
				currentCountOdds += e.oddsValue;
				console.log(e, ', ');
			});
		};

		// Get odds of player busting with next hit
		const getPlayerBustOdds = function() {
			switch (playerHand) {
				case 21:
					playerBustOdds = 100;
					return `100%, ${this.playerBustRating.POOR}`;
					break;
				case 20:
					playerBustOdds = 92;
					return `92%, ${this.playerBustRating.POOR}`;
					break;
				case 19:
					playerBustOdds = 85;
					return `85%, ${this.playerBustRating.POOR}`;
					break;
				case 18:
					playerBustOdds = 77;
					return `77%, ${this.playerBustRating.POOR}`;
					break;
				case 17:
					playerBustOdds = 69;
					return `69%, ${this.playerBustRating.FAIR}`;
					break;
				case 16:
				 	playerBustOdds = 62;
					return `62%, ${this.playerBustRating.AVERAGE}`;
				 	break;
				case 15:
				 	playerBustOdds = 58;
					return `58%, ${this.playerBustRating.AVERAGE}`;
					break;
				case 14:
					playerBustOdds = 56;
					return `56%, ${this.playerBustRating.AVERAGE}`;
					break;
				case 13:
					playerBustOdds = 39;
					return `39%, ${this.playerBustRating.GOOD}`;
					break;
				case 12:
					playerBustOdds = 31;
					return `31%, ${this.playerBustRating.GOOD}`;
					break;
				default:
					playerBustOdds = 0;
					return `0%, ${this.playerBustRating.GREAT}`;
					break;
			};
			console.log(playerBustOdds, '- playerBustOdds');
			return 'Error getting odds at this time. Check back later.';
		}; 												// End playerBustOdds

		getDealerUpCardOdds();
		adjustOddsForCountedCards(currentCountOdds);
		getPlayerBustOdds();

		// console.log(currentCountOdds, playerBustOdds, '- currentCountOdds, playerBustOdds');
		console.log(getPlayerBustOdds());
		return currentCountOdds, playerBustOdds;
	} 														// end getOdds().

	getCount(dealer, countedCardsArr, currentCountOdds) {
		this.countedCardsArr = countedCardsArr;
		this.currentCountOdds = currentCountOdds;
		this.dealer = dealer;

		const countedRanksArr = this.countedCardsArr.map(function(card) {
			return card.rank;
		});

		console.log(`Your current count should be ${this.currentCountOdds}.\n Here are the cards played thusfar: \n
			${countedRanksArr}.`);
	}
}; 														// end class Strategy

export { Strategy };
