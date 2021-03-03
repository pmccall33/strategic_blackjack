import { HelperFunctions } 	from '../HelperFunctions.mjs';
import { Player }			from './Player.mjs';
const hf 	= new HelperFunctions();

/*  <<<======================================================>>>
							Strategy Class
	<<<======================================================>>> */

class Strategy {
	constructor() {
		this.playerHand = [],
		this.possibleHandValuesArr = [],
		this.playerHandValue = 0,
		this.dealerUpCardValue = 0,
		this.currentOdds = 48.3,
		this.currentCountOdds = 0,
		this.playerBustOdds = 0,
		this.playerHasAce = false,
		this.playerBustRating = hf.createEnumFromObjOfStrings({
			'GREAT' : ' 👍 💰 ZERO chance of busting. Go for it. ',
			'GOOD' : ' ✅ Pretty darn LOW chance.',
			'AVERAGE' : ' ↔️ Just about EVEN odds.',
			'FAIR' : ' ⚠️ On the HIGH side, Cuidado.',
			'POOR' : '  ❌ EXTREMELY likely. Would. Not. Advise.'
		})
	}

	// Basic Strategy Chart to get correct play upon initial deal
	getBasicStrategicPlay(player, dealer) {

		// set player and hand values for strategy
		this.player = player;
		this.playerHand = player.currentHand;
		this.playerHandValue = player.currentTally;
		this.dealerUpCardValue = dealer.currentHand[0].value;

		// Update player data
		// this.player.handValue(player);


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
		};  									// -------------------------------------   end switch stmnt for pairs.

		// Player has one ace. (soft totals).

		if (player.playerHasAce) {
			console.log(player.playerHasAce, this.playerHandValue, 'playerHasAce in soft totals');
			switch (this.playerHandValue) {     // switch 2
				case 21:
				case 11:
					return 'You got 21, Buddy. Relax and take your dough.';
					break;
				case 20:
				case 10:
					return 'You should Stay';
					break;
				case 19:
				case 9:
					return this.this.dealerUpCardValue === 6 ? 'Double Down!' : 'Stand Pat';

					// if (this.dealerUpCardValue === 6) {
					///			return 'Double Down!';
					// } else {
					///			return 'Stay';
					// };
					break;
				case 18:
				case 8:
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
				case 7:
					return (this.dealerUpcardValue === 2 || 6 < this.dealerUpCardValue) ? 'Hit on this' : 'Double Down, My Friend'

					// if (this.dealerUpCardValue === 2 || 7 || 8 || 9 || 10 || 11) {
					//			return 'Hit';
					// } else {
					//			return 'Double Down';
					// };
					break;
				case 15:
				case 16:
				case 5:
				case 6:
					return ( 3 < this.dealerUpCardValue < 7 ) ? 'Double it Up' : 'Hit';

					// if (this.dealerUpCardValue === 4 || 5 || 6) {
					//			return 'Double Down';
					// } else {
					//			return 'Hit';
					// };
					break;
				case 13:
				case 14:
				case 3:
				case 4:
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
		}; 									//  -----------------------------    End switch for one ace/soft hands.

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
		}; 									// -------------------------------    end switch hardTotals/ no ace
		return 'Error in getting Strategy';
	} 																		// ----------------  end getBasicStrategicPlay() ------------

	getOdds(player, dealer, countedCardsArr, currentCountOdds) { 				// ++++++++++ START getOdds() +++
		let dealerUpCardValue = dealer.currentHand[0].value;
		this.player = player;
		let playerHasAce = this.player.playerHasAce;
		currentCountOdds = 0;

		let playerHand = this.player.currentTally;
		let playerBustOdds = 0;
		let handOdds = currentCountOdds += currentCountOdds

		this.possibleHandValuesArr = this.player.getPossibleHandValuesArr();

		// Get odds against dealerUpCard
		const getDealerUpCardOdds = function() {
			let dealerCountOdds = 0;
			switch (dealerUpCardValue) {			// DealerUpCard switch
				case 11:
					dealerCountOdds -= 16.0;
					break;
				case 10:
					dealerCountOdds -= 16.9;
					break;
				case 9:
					dealerCountOdds -= 4.3;
					break;
				case 8:
					dealerCountOdds += 5.4;
					break;
				case 7:
					dealerCountOdds += 14.3;
					break;
				case 6:
					dealerCountOdds += 23.9;
					break;
				case 5:
					dealerCountOdds += 23.2;
					break;
				case 4:
					dealerCountOdds += 18.0;
					break;
				case 3:
					dealerCountOdds += 13.4;
					break;
				case 2:
					dealerCountOdds += 9.8;
					break;
				default:
					dealerCountOdds = 0;
					console.log('Error in getDealerUpCardOdds switch, try again later.');
					break;
			};
			console.log(dealerCountOdds,'dealerCountOdds ++++<<<');
			return dealerCountOdds;
		};										// End dealerUpCardOdds()

		// Adjust and display odds for dealt/counted cards
		const adjustOddsForCountedCards = function(odds) {
			countedCardsArr.forEach( card => {
				odds += card.oddsValue;
			});
			const adjOdds = odds;
			console.log(adjOdds, 'adjOdds in adjust-------≤≤≤');
			return adjOdds;
		};

		// Get odds of player busting with next hit
		const getPlayerBustOdds = (player, odds) => {
			let currentBustRating = this.playerBustRating.GREAT;
			let tblOdds = odds;

			// If player has ace use the lowest hand value to get bust chances
			if (playerHasAce) {
				playerHand = this.possibleHandValuesArr[this.possibleHandValuesArr.length - 1];
			}

			// Switch to determmine total player odds of busting on a hit card
			if (playerHand < 12) {
				playerBustOdds = 0;
				currentBustRating = this.playerBustRating.GREAT;
			} else {
					switch (playerHand) {
						case 21:
							playerBustOdds = 100;
							currentBustRating = this.playerBustRating.POOR;
							break;
						case 20:
							playerBustOdds = 92;
							currentBustRating = this.playerBustRating.POOR;
							break;
						case 19:
							playerBustOdds = 85;
							currentBustRating = this.playerBustRating.POOR;
							break;
						case 18:
							playerBustOdds = 77;
							currentBustRating = this.playerBustRating.POOR;
							break;
						case 17:
							playerBustOdds = 69;
							currentBustRating = this.playerBustRating.FAIR;
							break;
						case 16:
						 	playerBustOdds = 62;
							currentBustRating = this.playerBustRating.FAIR;
						 	break;
						case 15:
						 	playerBustOdds = 58;
							currentBustRating = this.playerBustRating.AVERAGE;
							break;
						case 14:
							playerBustOdds = 56;
							currentBustRating = this.playerBustRating.AVERAGE;
							break;
						case 13:
							playerBustOdds = 39;
							currentBustRating = this.playerBustRating.GOOD;
							break;
						case 12:
							playerBustOdds = 31;
							currentBustRating = this.playerBustRating.GOOD;
							break;
						default:
							playerBustOdds = NaN;
							console.log('OOPS. Error getting bust odds at this time. Check back later.');
							break
						};
				};
				console.log(tblOdds, ': tblOdds', playerBustOdds, ': playerBustOdds', currentBustRating.descrption, ': currentBustRating.descrption');

				// adjust for current count and dealer up card, adjust for Ace and format to 4 sigdigs
				let totalPlayerBustOdds;
				(this.player.playerHasAce && this.player.currentHand.length < 3)
						? totalPlayerBustOdds = 0
						: totalPlayerBustOdds = Math.floor(((playerBustOdds += tblOdds) * 1000) / 1000 );


				const resArr = [ playerBustOdds, currentBustRating ];
				return resArr;
		};

													// ----------------    		End playerBustOdds -----------

		// Take all KNOWn table factors and compute odds
		let adjustedTableOdds = adjustOddsForCountedCards(getDealerUpCardOdds());
		adjustedTableOdds = Math.floor((adjustedTableOdds * 1000) / 1000 );

		let sign = '+';
		(adjustedTableOdds > 0) ? sign : sign = '';

		// console.log(adjustedTableOdds, 'adjTblOdds  $$$$$$$');
		// Get players total current odds and bust rating symbol
		const bustOddsAndRating = getPlayerBustOdds(this.player, adjustedTableOdds);
		// console.log(bustOddsAndRating, 'bustOddsAndRating *^*^*^*^*^*^*^8');

		const res = `playerAdvantage: ${sign}${adjustedTableOdds}%,\nplayerBustOdds: ${bustOddsAndRating[0]}%,\n ${bustOddsAndRating[1].description}`;
		return res;
	} 														//	-------------------- 			 end getOdds(). ================

	getCount(dealer, countedCardsArr, currentCountOdds) {
		this.countedCardsArr = countedCardsArr;
		this.currentCountOdds = currentCountOdds;
		this.dealer = dealer;

		// Get Arr of cards already played to return to player
		const countedRanksArr = this.countedCardsArr.map((card) => card.rank);

		// Adjust count odds here

		const res = `Your current count should be ${this.currentCountOdds}.\n Here are the cards played thusfar: \n
			${countedRanksArr}.`;
		console.log(res);
		return res;
	}
}; 														// ---------------- 					end class Strategy

export { Strategy };
