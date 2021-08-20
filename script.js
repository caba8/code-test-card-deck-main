class CardDeck {
	constructor(deckElement, handElement) {
		this.deckElement = document.querySelector(deckElement);
		this.handElement = document.querySelector(handElement);
		this.deck = [
			{ id: "c-2", name: "2 of Clubs", rank: 2, suit: "clubs" },
			{ id: "c-3", name: "3 of Clubs", rank: 3, suit: "clubs" },
			{ id: "c-4", name: "4 of Clubs", rank: 4, suit: "clubs" },
			{ id: "c-5", name: "5 of Clubs", rank: 5, suit: "clubs" },
			{ id: "c-6", name: "6 of Clubs", rank: 6, suit: "clubs" },
			{ id: "c-7", name: "7 of Clubs", rank: 7, suit: "clubs" },
			{ id: "c-8", name: "8 of Clubs", rank: 8, suit: "clubs" },
			{ id: "c-9", name: "9 of Clubs", rank: 9, suit: "clubs" },
			{ id: "c-10", name: "10 of Clubs", rank: 10, suit: "clubs" },
			{ id: "c-J", name: "Jack of Clubs", rank: 11, suit: "clubs" },
			{ id: "c-Q", name: "Queen of Clubs", rank: 12, suit: "clubs" },
			{ id: "c-K", name: "King of Clubs", rank: 13, suit: "clubs" },
			{ id: "c-A", name: "Ace of Clubs", rank: 14, suit: "clubs" },
			{ id: "d-2", name: "2 of Diamonds", rank: 2, suit: "diamonds" },
			{ id: "d-3", name: "3 of Diamonds", rank: 3, suit: "diamonds" },
			{ id: "d-4", name: "4 of Diamonds", rank: 4, suit: "diamonds" },
			{ id: "d-5", name: "5 of Diamonds", rank: 5, suit: "diamonds" },
			{ id: "d-6", name: "6 of Diamonds", rank: 6, suit: "diamonds" },
			{ id: "d-7", name: "7 of Diamonds", rank: 7, suit: "diamonds" },
			{ id: "d-8", name: "8 of Diamonds", rank: 8, suit: "diamonds" },
			{ id: "d-9", name: "9 of Diamonds", rank: 9, suit: "diamonds" },
			{ id: "d-10", name: "10 of Diamonds", rank: 10, suit: "diamonds" },
			{ id: "d-J", name: "Jack of Diamonds", rank: 11, suit: "diamonds" },
			{ id: "d-Q", name: "Queen of Diamonds", rank: 12, suit: "diamonds" },
			{ id: "d-K", name: "King of Diamonds", rank: 13, suit: "diamonds" },
			{ id: "d-A", name: "Ace of Diamonds", rank: 14, suit: "diamonds" },
			{ id: "h-2", name: "2 of Hearts", rank: 2, suit: "hearts" },
			{ id: "h-3", name: "3 of Hearts", rank: 3, suit: "hearts" },
			{ id: "h-4", name: "4 of Hearts", rank: 4, suit: "hearts" },
			{ id: "h-5", name: "5 of Hearts", rank: 5, suit: "hearts" },
			{ id: "h-6", name: "6 of Hearts", rank: 6, suit: "hearts" },
			{ id: "h-7", name: "7 of Hearts", rank: 7, suit: "hearts" },
			{ id: "h-8", name: "8 of Hearts", rank: 8, suit: "hearts" },
			{ id: "h-9", name: "9 of Hearts", rank: 9, suit: "hearts" },
			{ id: "h-10", name: "10 of Hearts", rank: 10, suit: "hearts" },
			{ id: "h-J", name: "Jack of Hearts", rank: 11, suit: "hearts" },
			{ id: "h-Q", name: "Queen of Hearts", rank: 12, suit: "hearts" },
			{ id: "h-K", name: "King of Hearts", rank: 13, suit: "hearts" },
			{ id: "h-A", name: "Ace of Hearts", rank: 14, suit: "hearts" },
			{ id: "s-2", name: "2 of Spades", rank: 2, suit: "spades" },
			{ id: "s-3", name: "3 of Spades", rank: 3, suit: "spades" },
			{ id: "s-4", name: "4 of Spades", rank: 4, suit: "spades" },
			{ id: "s-5", name: "5 of Spades", rank: 5, suit: "spades" },
			{ id: "s-6", name: "6 of Spades", rank: 6, suit: "spades" },
			{ id: "s-7", name: "7 of Spades", rank: 7, suit: "spades" },
			{ id: "s-8", name: "8 of Spades", rank: 8, suit: "spades" },
			{ id: "s-9", name: "9 of Spades", rank: 9, suit: "spades" },
			{ id: "s-10", name: "10 of Spades", rank: 10, suit: "spades" },
			{ id: "s-J", name: "Jack of Spades", rank: 11, suit: "spades" },
			{ id: "s-Q", name: "Queen of Spades", rank: 12, suit: "spades" },
			{ id: "s-K", name: "King of Spades", rank: 13, suit: "spades" },
			{ id: "s-A", name: "Ace of Spades", rank: 14, suit: "spades" },
		];
		this.possibleCards = [...this.deck];
		this.hand = [];
		this.init();
	}
	init() {
		this.shuffleDeck();

		let cardElements = document.querySelectorAll(".card");

		cardElements.forEach((cardElement) => {
			cardElement.addEventListener("click", (e) => {
				if (cardElement.dataset.inHand == "true") {
					this.discard(cardElement.id);
				} else {
					this.draw(cardElement.id);
				}
			});
		});
	}

	generateRandomNumber(min, max) {
		return Math.random() * (max - min) + min;
	}

	buildCard(card, inHand = false) {
		return `
		<div id="${card.id}" class="card" data-in-hand="${inHand}" data-rank="${card.rank}" data-suit="${card.suit}">
			<div class="card-face-wrapper">
				<img alt="${card.name}" src="assets/cards/${card.id}.svg">
				<div class="card-back"></div>
			</div>
		</div>`;
	}

	buildDeck() {
		this.deckElement.innerHTML = "";

		this.deck.forEach((card) => {
			let cardString = this.buildCard(card);
			this.deckElement.insertAdjacentHTML("beforeend", cardString);
		});
		let cardElements = this.deckElement.children;
		for (let cardElement of cardElements) {
			this.ruffleCardElement(cardElement);
		}
	}

	shuffleDeck() {
		for (let i = this.deck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
		}
		this.buildDeck();
		this.possibleCards = [...this.deck];
	}

	ruffleCardElement(cardElement) {
		let rotation = this.generateRandomNumber(-10, 10) + "deg";
		let X = this.generateRandomNumber(-10, 10) + "px";
		let Y = this.generateRandomNumber(-10, 10) + "px";
		cardElement.style.transform = `rotate(${rotation}) translate3D(${X}, ${Y}, 0px)`;
	}

	draw(id) {
		let card = this.deck.find((x) => x.id === id);
		let cardElement = document.getElementById(id);
		cardElement.style.transform = "";

		this.hand.push(card);
		this.deck = this.deck.filter((deckCard) => deckCard.id != id);

		this.handElement.appendChild(cardElement);
		setTimeout(() => {
			document.getElementById(id).dataset.inHand = "true";
		}, 10);
	}

	discard(id) {
		let card = this.hand.find((x) => x.id === id);
		let cardElement = document.getElementById(id);

		this.deck.push(card);
		this.hand = this.hand.filter((handCard) => handCard.id != id);

		document.getElementById(id).dataset.inHand = "false";
		setTimeout(() => {
			this.deckElement.appendChild(cardElement);
			this.ruffleCardElement(cardElement);
		}, 600);
	}

	sort() {
		this.possibleCards = this.possibleCards.sort((a, b) =>
			a.suit > b.suit ? 1 : a.suit === b.suit ? (a.rank > b.rank ? 1 : -1) : -1
		);
	}

	filter(cardProp = null, values = []) {
		this.possibleCards = this.possibleCards.filter((card) => values.includes(card[cardProp]));
	}

	limit(number) {
		this.possibleCards = this.possibleCards.slice(0, number);
	}

	drawFiltered() {
		this.possibleCards.forEach((card) => {
			this.draw(card.id);
		});
	}
}

/*------------------------------------------*/
//  Use the above predefined class and its
//  methods to complete the challenge.
//
//  Your code goes below this comment.
/*------------------------------------------*/

// Create a new card deck.
const deck = new CardDeck(".deck", ".hand");
// Take a look at the deck object and its methods.
console.log(deck);

const newFuntionParameters = () =>{
	var url = window.location.search;
	const urlParams = new URLSearchParams(url);
	const suits = {
		"spades": "s",
		"hearts":"h",
		"diamonds":"d",
		"clubs":"c"
	};
	var cardsParameter = [];
	var ranksParameter = [];
	var suitsParameter = [];
	var limitNumber = 0;
	
	if(urlParams.has("cards")){
		cardsParameter = urlParams.get("cards").split(" ");
	
		cardsParameter.forEach(card=>{
			let lastWord = card.substring(card.length - 1, card.length);
			deck.draw(card.replace(lastWord,lastWord.toUpperCase()));
		});
	}else{
		if(urlParams.has("suits")){
			suitsParameter = urlParams.get("suits").split(" ");
		}
		
		if(urlParams.has("ranks")){
			ranksParameter = urlParams.get("ranks").split(" ");
		}
		
		if(urlParams.has("limit")){
			limitNumber = urlParams.get("limit").split(" ");
		}	
	
		if(ranksParameter.length>0){
			var hasSuits = urlParams.has("suits");
			ranksDeck(ranksParameter.sort((a,b)=>a-b), hasSuits, suitsParameter, suits, limitNumber);
			
		}else{
			suitsDeck(suitsParameter, suits, limitNumber);
		}
	}
};

const suitsDeck = (suitsParameter, suits, limitNumber) =>{
	const cardsToDraw = [];

	suitsParameter.forEach(suit=>{
		let simboleSuit = suits[suit.toLowerCase()];
		if(simboleSuit != undefined){
			cardsToDraw.push(simboleSuit+"-A");

			for (var i = 2; i < 11; i++) {
				cardsToDraw.push(simboleSuit+"-"+i);
			}

			cardsToDraw.push(simboleSuit+"-J");
			cardsToDraw.push(simboleSuit+"-Q");
			cardsToDraw.push(simboleSuit+"-K");
		}		
	});

	if(limitNumber>0){
		while(cardsToDraw.length != limitNumber){
			cardsToDraw.splice(Math.floor(deck.generateRandomNumber(0,cardsToDraw.length)),1);
		}
	}

	cardsToDraw.forEach(card=>{
		deck.draw(card);
	})
};

const ranksDeck = (ranksParameter, hasSuits, suitsParameter, suits, limitNumber) =>{

	const cardsToDraw = [];

	ranksParameter.forEach(number=>{
		if(number>0 && number<14){
			switch (parseInt(number)) {
				case 1:
					number = "A";
					break;
				case 11:
					number = "J";
					break;
				case 12:
					number = "Q";
				  break;
				case 13:
					number = "K";
				  break;
				default:
				  break;
			}

			if(hasSuits){
				suitsParameter.forEach(suit=>{
					let simboleSuit = suits[suit.toLowerCase()];
					if(simboleSuit != undefined){	
						cardsToDraw.push(simboleSuit+"-"+number);
					}		
				});
			}else{
				cardsToDraw.push("s-"+number);
				cardsToDraw.push("h-"+number);
				cardsToDraw.push("d-"+number);
				cardsToDraw.push("c-"+number);
			}
		}
	});

	if(limitNumber>0){
		while(cardsToDraw.length != limitNumber){
			cardsToDraw.splice(Math.floor(deck.generateRandomNumber(0,cardsToDraw.length)),1);
		}
	}

	cardsToDraw.forEach(card=>{
		deck.draw(card);
	})

	deck.hand = deck.hand.sort((a, b) =>
		a.suit > b.suit ? 1 : a.suit === b.suit ? (a.rank > b.rank ? 1 : -1) : -1
	);
};

const sortDeck = () =>{
	var parent = document.getElementsByClassName('hand');
	parent.innerHTML = "";
	toSort = Array.prototype.slice.call(parent[0].children, 0);
	
	toSort.sort((a, b) =>
		a["attributes"][4].value > b["attributes"][4].value ? 1 : a["attributes"][4].value === b["attributes"][4].value ? (parseInt(a["attributes"][3].value) > parseInt(b["attributes"][3].value) ? 1 : -1) : -1
	);

	for(var i = 0, l = toSort.length; i < l; i++) {
		parent[0].appendChild(toSort[i]);
	}
};

newFuntionParameters();
sortDeck();