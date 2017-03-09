// Evaluates the current Hand based on the lookup tables and returns the appropriate response [SEE Hand.js createTables.js]
// Return value will be one of ['hit', 'stand', 'split', 'double', 'surrender']
function decide() {
    var p1 = hand.player.firstCard.value, p2 = hand.player.secondCard.value, d = hand.dealer.value;
    var handTotal = p1 + p2;
    var surrenderCondition = handTotal == 16 && (d == 9 || d == 10 || d == 1);
    surrenderCondition |= handTotal == 15 && d == 10;

    if (hand.isSplit()) {   // lookup in splitHands table [SEE createTables.js]
        // If you should not split the hand, revert to hard hand totals
        return splitHands[p1 - 1][d - 1] ? 'split' : legend[hardHands[handTotal - 4][d - 1]];
    } else if (hand.isSoft()) {     // lookup in softHands table [SEE createTables.js]
        var value = hand.player.firstCard.isAce() ? p2 : p1;
        return legend[softHands[value - 2][d - 1]]
    } else if ($('#surrender-allowed').prop('checked') && surrenderCondition) {
        return 'surrender'
    } else {    // lookup in hardHands table [SEE createTables.js]
        return legend[hardHands[handTotal - 4][hand.dealer.value - 1]]
    }
}
