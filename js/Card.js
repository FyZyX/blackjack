// Definition of the Card class
// Cards have a numeric VALUE between 1 and 10 and an associated SUIT
// Ace is represented by 1, T (meaning 10, J, Q, and K) is represented by 10
var Card = function (value, suit) {
    // If the value and/or suit of a Card is not specified, generate a random one
    this.value = value != undefined ? value : generateRandomCardValue();
    this.suit = suit != undefined ? suit : generateRandomCardSuit();
};

// Returns the Boolean value TRUE if the card is an Ace, otherwise FALSE
Card.prototype.isAce = function () { return this.value == 1 };

// Create a human-readable String representing the value and suit of the Card
Card.prototype.valueString = function () {
    if (this.value == 1) { return 'A' }   // Replace 1 with A
    else if (this.value == 10) { return 'T' }   // Replace 10 with T
    else { return this.value.toString() }
};

// Image credit: Byron Knoll http://opengameart.org/content/playing-cards-vector-png
Card.prototype.getImage = function () {
    var cardString;
    if (this.isAce()) { cardString = 'ace_of_' + this.suit }    // change name for aces
    // change name for court cards
    else if (this.value == 10) {
        var choice = randomChoice(['10', 'jack', 'queen', 'king']);
        cardString = choice + '_of_' + this.suit;
        if (choice != '10') { cardString += '2' }
    }
    else { cardString = this.value.toString() + '_of_' + this.suit }
    return 'images/playing-cards/png/' + cardString + '.png'
};

// Returns a String containing a randomly selected number between 1 and 10.
function generateRandomCardValue() { return Math.ceil(10 * Math.random()) }

// Returns a String containing a randomly selected character representing one of the four playing card suits
// C: Clubs, D: Diamonds, H: Hearts, S: Spades
function generateRandomCardSuit() { return randomChoice(['clubs', 'diamonds', 'hearts', 'spades']) }

// Returns the Boolean TRUE if the two cards have both the same value and suit, otherwise FALSE
function sameCard(card1, card2) { return card1.value == card2.value && card1.suit == card2.suit }
