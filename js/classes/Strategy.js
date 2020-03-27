/*  <<<======================================================>>>
							Strategy Class
	<<<======================================================>>> */

class Strategy {
	constructor() {
		this.playerHand = [],
		this.playerHandValue = 0,
		this.dealerUpCardValue = 0,
		this.recommendPlay = '',
		this.currentOdds = 48.3,
		this.currentCountOdds = 0,
		this.bustOdds = 0
	}

	// Basic Strategy Chart to get recommended play upon initial deal
	getBasicStrategicPlay(player, dealer) {
		this.player = player;
		// Update player data
		this.player.handValue(player);

		this.playerHand = player.currentHand;
		this.playerHandValue = player.currentTally;
		this.dealerUpCardValue = dealer.currentHand[0].value;
			


		console.log(player, '--player in getStrategy');
		console.log(dealer, '--dealer in getStrategy');
		console.log(this.playerHandValue, '-- playerHandValue');
		console.log(this.dealerUpCardValue, 'dealerUpcardValue');
		
		// Compare player hand to dealer up card for 'correct' play

		if (this.playerHandValue === 21) {
			this.recommendPlay = 'Hey Buddy, you got 21. Might as well stay here.';
		};

		/* Player has a pair, compare to dealer up card for split/double strategy*/
		if (this.playerHand[0].rank === this.playerHand[1].rank) {
			console.log(this.dealerUpCardValue, ' dealerUpcard in pair');
			switch (this.playerHand[0].value) {   // switch 1
				case 8:
				case 11:
					this.recommendPlay = 'Split Em';
					break;
				case 5:
				case 10:
					this.recommendPlay = 'Don\'t Split';
					break;
				case 9:
					if (this.dealerUpCardValue === 7 || 10 || 11) {
						this.recommendPlay = 'Don\'t Split';
					} else if (this.dealerUpCardValue === 2 || 3 || 4 || 5 || 6 || 8 || 9) {
						this.recommendPlay = 'Split Em';
					};
					break;
				case 2:
				case 3:
				case 4:
					if (this.dealerUpCardValue === 2 || 3 || 4 || 5 || 6 || 7) {
						this.recommendPlay = 'Split \'em';
					} else if (this.dealerUpCardValue === 8 || 9 || 10 || 11) {
						this.recommendPlay = 'Don\'t Split';
					};
					break;
				case 6:
					if (this.dealerUpCardValue === 2 || 3 || 4 || 5 || 6) {
						this.recommendPlay = 'Split \'em';
					} else if (this.dealerUpCardValue === 7 || 8 || 9 || 10 || 11) {
						this.recommendPlay = 'Don\'t Split';
					};
					break;
				case 4:
					if ((this.dealerUpCardValue === 5) || (this.dealerUpCardValue === 6)) {
						this.recommendPlay = 'Split';
					} else if (this.dealerUpCardValue === 2 || 3 || 4 || 7 || 8 || 9 || 10 || 11) {
						this.recommendPlay = 'Don\'t Split';
					};
					break;
				default:
					console.log('Error getting strategy in switch 1');

			};  // edn switch
			console.log(this.recommendPlay, 'recommendPlay with a pair')
			return this.recommendPlay;
		};  // end if stmnt for pairs.

		// Player has one ace. (soft totals).
		if (player.playerHasAce) {
			console.log(player.playerHasAce, 'playerHasAce in soft totals');
			switch (this.playerHandValue) {     // switch 2
				case 21:
					this.recommendPlay = 'You got Blackjack, buddy. Relax.';
					break;
				case 20:
					this.recommendPlay = 'Stay';
					break;
				case 19:
					if (this.dealerUpCardValue === 6) {
						this.recommendPlay = 'Double Down';
					} else {
						this.recommendPlay = 'Stay';
					};
					break;
				case 18:
					if (this.dealerUpCardValue === 2 || 3 || 4 || 5 || 6) {
						this.recommendPlay = 'Double Down';
					} else if (this.dealerUpCardValue === 7 || 8) {
						this.recommendPlay = 'Stay';
					} else {
						this.recommendPlay = 'Hit';
					};
					break;
				case 17:
					if (this.dealerUpCardValue === 2 || 7 || 8 || 9 || 10 || 11) {
						this.recommendPlay = 'Hit';
					} else {
						this.recommendPlay = 'Double Down';
					};
					break;
				case 15:
				case 16:
					if (this.dealerUpCardValue === 4 || 5 || 6) {
						this.recommendPlay = 'Double Down';
					} else {
						this.recommendPlay = 'Hit';
					};
					break;
				case 13:
				case 14:
					if (this.dealerUpCardValue === 5 || 6) {
						this.recommendPlay = 'Double Down';
					} else {
						this.recommendPlay = 'Hit';
					};
					break;
				default:
					console.log('Error getting strategy in switch 2');
			};  // end soft total switch
			console.log(this.recommendPlay, ' - for soft total');
			return this.recommendPlay;
		}; // End if for one ace/soft hands.

		// No pair/No ace in players hand. (Hard totals).
		if ((this.playerHand[0] !== this.playerHand[1]) && (!player.playerHasAce)) {
			if ((0 < this.playerHandValue) && (this.playerHandValue <= 8)) {
				this.recommendPlay = 'Hit';
			};

			if ((this.playerHandValue > 17) && (this.playerHandValue <=21)) {
				this.recommendPlay = 'Stay';
			};

			if (this.dealerUpCardValue === 10 || 11) { 
				switch (this.playerHandValue) {  // switch 3
					case 17: 
						this.recommendPlay = 'Stay';
						break;
					case 8:
					case 9:
					case 10:
					case 12: 
					case 13: 
					case 14: 
					case 15:
					case 16:
					// case (8 || 9 || 10 || 12 || 13 || 14 || 15 || 16):
						this.recommendPlay = 'Hit';
						break;
					case 11:
						this.recommendPlay = 'Double Down';
						break;
					default:
						console.log('Error getting strategy in switch 3.')
				};
			} else if (this.dealerUpCardValue === 7 || 8 || 9) {
				switch (this.playerHandValue) {  // switch 4
					case 17: 
						this.recommendPlay = 'Stay';
						break; 
					case 8:
					case 9:
					case 12:
					case 13:
					case 14:
					case 15:
					case 16:
					// case (8 || 9 || 10 || 12 || 13 || 14 || 15 || 16):
						this.recommendPlay = 'Hit';
						break;
					case 10:
					case 11:
					// case (10 || 11):
						this.recommendPlay = 'Double Down';
						break;
					default:
						console.log('Error getting strategy from switch 4');
				};
			} else if (this.dealerUpCardValue === 4 || 5 || 6) {
				switch (this.playerHandValue) {  // switch 5
					case 12:
					case 13:
					case 14:
					case 15:
					case 16:
					case 17:
					// case (12 || 13 || 14 || 15 || 16 || 17): 
						this.recommendPlay = 'Stay'; 
						break;
					case 8:
						this.recommendPlay = 'Hit';
						break;
					case 9:
					case 10:
					case 11:
					// case (9 || 10 || 11):
						this.recommendPlay = 'Double Down';
						break;
					default:
						console.log('Error getting strategy from switch 5');
				};				
			} else if (this.dealerUpCardValue === 3) {
				switch (this.playerHandValue) {   // switch 6
					case 13:
					case 14:
					case 15:
					case 16:
					case 17:
					// case (13 || 14 || 15 || 16 || 17): 
						this.recommendPlay = 'Stay';
						break; 
					case 8:
					case 12:
					// case (8 || 12):
						this.recommendPlay = 'Hit';
						break;
					case 9: 
					case 10:
					case 11: 
					// case (9 || 10 || 11):
						this.recommendPlay = 'Double Down';
						break;
					default: 
						console.log('Error gtting strategy from switch 6');
				}
				switch (this.playerHandValue) {   // switch 6
					case 13:
					case 14:
					case 15:
					case 16: 
					case 17:
					// case (13 || 14 || 15 || 16 || 17): 
						this.recommendPlay = 'Stay';
						break; 
					case 8:
					case 12:
					// case (8 || 12):
						this.recommendPlay = 'Hit';
						break;
					case 9:
					case 10:
					case 11:
					// case (9 || 10 || 11):
						this.recommendPlay = 'Double Down';
						break;
					default: 
						console.log('Error gtting strategy from switch 6');
				}
			} else if (this.dealerUpCardValue === 2) {
				switch (this.playerHandValue) {   // switch 7
					case 13:
					case 14:
					case 15:
					case 16:
					case 17:
					// case (13 || 14 || 15 || 16 || 17): 
						this.recommendPlay = 'Stay'; 
						break;
					case 8:
					case 9:
					case 10:
					// case (8 || 9 || 12):
						this.recommendPlay = 'Hit';
						break;
					case 10:
					case 11:
					// case (10 || 11):
						this.recommendPlay = 'Double Down';	
						break;
					default:
						console.log('Error getting strategy from switch 7');
				};
			}; 
			console.log(this.recommendPlay,'recommendedPlay without pair/ace');
			return this.recommendPlay;	
		}; // end if hard totals/ no ace
		if (!this.recommendPlay) {
			console.log('Error getting strategy.');
		};
		return this.recommendPlay;
	} // end getBasicStrategicPlay()

	getOdds(player, dealer, countedCardsArr, currentCountOdds) {
		this.dealerUpCardValue = dealer.currentHand[0].value;
		this.currentCountOdds = 0;
		this.countedCardsArr = countedCardsArr;

		// this.player.playerHandValue = player.currentTally;
		// Get odds against dealerUpCard
		this.currentOdds = 48.3;
		switch (this.dealerUpCardValue) {
			case 11:
				this.currentOdds -= 16.0;
				break;
			case 10:
				this.currentOdds -= 16.9;
				break;
			case 9:
				this.currentOdds -= 4.3;
				break;
			case 8:
				this.currentOdds += 5.4;
				break;
			case 7:
				this.currentOdds += 14.3;
				break;
			case 6:
				this.currentOdds += 23.9;
				break;
			case 5:
				this.currentOdds += 23.2;
				break;
			case 4:
				this.currentOdds += 18.0;
				break;
			case 3:
				this.currentOdds += 13.4;
				break;
			case 2: 
				this.currentOdds += 9.8;
				break;
			default:
				this.currentOdds = 0;
				console.log('error in odds switch');
				break;
		}; // End Switch

		console.log(this.countedCardsArr, 'countedCardsArr');
		// Adjust odds for dealt/counted cards
		for (let i = 0; i < this.countedCardsArr.length; i++) {
			console.log(this.countedCardsArr[i].oddsValue, 'card.oddsValue');
			this.currentCountOdds += this.countedCardsArr[i].oddsValue;
		};

		// for (let card in this.countedCardsArr) {
		// 	console.log(card.oddsValue, 'card.oddsValue');
		// 	this.currentCountOdds += card.oddsValue;
		// };
		console.log(this.countedCardsArr, this.currentCountOdds, (this.currentOdds += this.currentCountOdds), 'countedCardsArr, currentCountOdds, adjusted odds');
		return this.currentOdds += this.currentCountOdds, this.currentCountOdds;
	}  // end getOdds().

	getCount(dealer, countedCardsArr, currentCountOdds) {
		this.countedCardsArr = countedCardsArr;
		this.currentCountOdds = currentCountOdds;
		this.dealer = dealer;
		const player = 0;

		const countedRanksArr = this.countedCardsArr.map(function(card) {
			return card.rank;
		});

		for (let card in this.countedCardsArr)

		// Get currentCoundOdds
		this.getOdds(player, this.dealer, this.countedCardsArr, this.currentCountOdds);
		console.log(`Your current count should be ${this.currentCountOdds}.\n Here are the cards played: 
			${countedRanksArr}.`)
	}
}; // end Strategy class

export { Strategy };
