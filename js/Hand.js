// Definition of Hand class

// global Hand variable representing the current hand
// Calls to the function deal() will update this value
var hand;

var handTypes = ['splitHands', 'softHands', 'hardHands'];

// Definition of Hand constructor
// Hand objects have properties {player, dealer}
// PLAYER is itself an object with properties {firstCard, secondCard}
// Both of these properties are Card objects, representing each of the player's cards
// DEALER is a single Card object representing the dealer's up card
// [SEE Card.js]
var Hand = function (playerCard1, playerCard2, dealerCard) {
    this.player = {
        firstCard: playerCard1 != undefined ? playerCard1 : new Card(),     // Card object
        secondCard: playerCard2 != undefined ? playerCard2 : new Card()     // Card object
    };
    this.dealer = dealerCard != undefined ? dealerCard : new Card();        // Card object

    // Ensure all cards are different
    while (sameCard(this.player.firstCard, this.player.secondCard)) {
        this.player.secondCard = new Card()
    }
    while (sameCard(this.player.firstCard, this.dealer) || sameCard(this.player.secondCard, this.dealer)) {
        this.dealer = new Card()
    }
};

// --------------- BEGIN HAND METHODS ---------------

// Returns a Boolean: TRUE both of the player's cards have the same value, FALSE otherwise
Hand.prototype.isSplit = function () { return this.player.firstCard.value == this.player.secondCard.value };

// Returns a Boolean: TRUE if either of the player's cards is an Ace, FALSE otherwise
Hand.prototype.isSoft = function () { return this.player.firstCard.isAce() || this.player.secondCard.isAce() };

// Returns a key to access the appropriate property of playerStats [SEE stats.js]
Hand.prototype.handType = function () {
    return hand.isSplit() ? handTypes[0] : (hand.isSoft() ? handTypes[1] : handTypes[2]);
};

Hand.prototype.display = function () {
    // Display the dealer's up card
    $('#dealer-up-card').prop('src', hand.dealer.getImage());
    // Display the player's first card
    $('#player-card-1').prop('src', hand.player.firstCard.getImage());
    // Display the player's second card
    $('#player-card-2').prop('src', hand.player.secondCard.getImage());
};

Hand.prototype.storageString = function () {
    var p1 = this.player.firstCard, p2 = this.player.secondCard, d = this.dealer;
    if (p2.value < p1.value) return p2.valueString() + p1.valueString() + d.valueString();
    else return p1.valueString() + p2.valueString() + d.valueString()
};

// --------------- END HAND METHODS ---------------

// --------------- RELATED FUNCTIONS ---------------

function deal() {
    // Assign a random Hand object the global variable hand
    hand = new Hand();

    // TESTING PURPOSES ONLY
    // Assign a specific Hand object to the global variable hand
    // hand = new Hand(new Card(6, 'spades'), new Card(6, 'spades'), new Card(10));

    // Default display message
    hand.display();

    updateButtons();
}
