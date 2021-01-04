/* 	<<<=======================================================>>> 
							Card Class 
	<<<=======================================================>>> */

class Card {
	constructor(rank, suit, oddsValue) {
		this.rank = rank;
		this.suit = suit;
		this.oddsValue = 0;
		// this.value will be set later
		// this.image will be set later
	}
	
	getValue() {
		if (this.rank === 'K' ||
			this.rank === 'Q' ||
			this.rank === 'J' ||
			this.rank === 10) {
			this.value = 10;
			this.oddsValue = -0.51;
		} else if (this.rank === 'A') {
			this.value = 11;
			this.oddsValue = -0.59;
		} else {
			this.value = this.rank;
			switch (this.value) {
				case 9: 
					this.oddsValue = -0.15;
					break;
				case 8:
					this.oddsValue = 0.01;
					break;
				case 7:
					this.oddsValue = 0.30;
					break;
				case 6: 
					this.oddsValue = 0.45;
					break;
				case 5:
					this.oddsValue = 0.67;
					break;
				case 4:
					this.oddsValue = 0.52;
					break;
				case 3:
					this.oddsValue = 0.43;
					break;
				case 2:
					this.oddsValue = 0.40;
					break;
			};
		};
	}

	getHTML() {
		// card <img> elment
		const $cardImage = $('<img>', {id: `${this.rank}-${this.suit}`, class: "card", src: `${this.image}`});
		return $cardImage
	}
};

export { Card };