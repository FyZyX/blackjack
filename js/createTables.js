// Defines global variables to hold proper play decisions for each possible hand [SEE Hand.js]
var splitHands, softHands, hardHands, legend;

// Initializes tables according to the rules stipulated by the input arguments
function createTables(doubleAllowed, doubleAfterSplit) {
    splitHands = [
        [true, true, true, true, true, true, true, true, true, true],                                   // A vs [A, 2, ..., 9, T]
        [false, doubleAfterSplit, doubleAfterSplit, true, true, true, true, false, false, false],       // 2 vs [A, 2, ..., 9, T]
        [false, doubleAfterSplit, doubleAfterSplit, true, true, true, true, false, false, false],       // 3 vs [A, 2, ..., 9, T]
        [false, false, false, false, doubleAfterSplit, doubleAfterSplit, false, false, false, false],   // 4 vs [A, 2, ..., 9, T]
        [false, false, false, false, false, false, false, false, false, false],                         // 5 vs [A, 2, ..., 9, T]
        [false, true, true, true, true, true, false, false, false, false],                              // 6 vs [A, 2, ..., 9, T]
        [false, true, true, true, true, true, true, false, false, false],                               // 7 vs [A, 2, ..., 9, T]
        [true, true, true, true, true, true, true, true, true, true],                                   // 8 vs [A, 2, ..., 9, T]
        [false, true, true, true, true, true, false, true, true, false],                                // 9 vs [A, 2, ..., 9, T]
        [false, false, false, false, false, false, false, false, false, false]                          // T vs [A, 2, ..., 9, T]
    ];
    softHands = [
        ['H', 'H', 'H', 'H', 'D', 'D', 'H', 'H', 'H', 'H'],         // (A, 2) vs [A, 2, ..., 9, T]
        ['H', 'H', 'H', 'H', 'D', 'D', 'H', 'H', 'H', 'H'],         // (A, 3) vs [A, 2, ..., 9, T]
        ['H', 'H', 'H', 'D', 'D', 'D', 'H', 'H', 'H', 'H'],         // (A, 4) vs [A, 2, ..., 9, T]
        ['H', 'H', 'H', 'D', 'D', 'D', 'H', 'H', 'H', 'H'],         // (A, 5) vs [A, 2, ..., 9, T]
        ['H', 'H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H'],         // (A, 6) vs [A, 2, ..., 9, T]
        ['H', 'Ds', 'Ds', 'Ds', 'Ds', 'Ds', 'S', 'S', 'H', 'H'],    // (A, 7) vs [A, 2, ..., 9, T]
        ['S', 'S', 'S', 'S', 'S', 'Ds', 'S', 'S', 'S', 'S'],        // (A, 8) vs [A, 2, ..., 9, T]
        ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],         // (A, 9) vs [A, 2, ..., 9, T]
        ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S']          // (A, T) vs [A, 2, ..., 9, T]
    ];
    hardHands = [
        ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],         // 4 vs [A, 2, ..., 9, T]
        ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],         // 5 vs [A, 2, ..., 9, T]
        ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],         // 6 vs [A, 2, ..., 9, T]
        ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],         // 7 vs [A, 2, ..., 9, T]
        ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],         // 8 vs [A, 2, ..., 9, T]
        ['H', 'H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H'],         // 9 vs [A, 2, ..., 9, T]
        ['H', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H'],         // 10 vs [A, 2, ..., 9, T]
        ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D'],         // 11 vs [A, 2, ..., 9, T]
        ['H', 'H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H'],         // 12 vs [A, 2, ..., 9, T]
        ['H', 'S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H'],         // 13 vs [A, 2, ..., 9, T]
        ['H', 'S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H'],         // 14 vs [A, 2, ..., 9, T]
        ['H', 'S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H'],         // 15 vs [A, 2, ..., 9, T]
        ['H', 'S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H'],         // 16 vs [A, 2, ..., 9, T]
        ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],         // 17 vs [A, 2, ..., 9, T]
        ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],         // 18 vs [A, 2, ..., 9, T]
        ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],         // 19 vs [A, 2, ..., 9, T]
        ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],         // 20 vs [A, 2, ..., 9, T]
        ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S']          // 21 vs [A, 2, ..., 9, T]
    ];
    legend = {
        H: 'hit',
        S: 'stand',
        D: doubleAllowed ? 'double' : 'hit',
        Ds: doubleAllowed ? 'double' : 'stand'
    };
}