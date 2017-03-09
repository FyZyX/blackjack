var playerStats;

function savePlayerStats() {
    localStorage.setItem('playerStats', JSON.stringify(playerStats));
}

function initializePlayerStats() {
    playerStats = {
        splitHands: [0, 0],
        softHands: [0, 0],
        hardHands: [0, 0],
        handsAttempted: 0,
        lastHundredCorrect: 0,
        masteryPoints: [0, 0, 0],
        mastery: 0
    };
    savePlayerStats()
}

// Prints current stat string to the screen
// Returns human-readable String in the form '#% (numberCorrect/numberOfAttempts)'
// Both percent() and sum() can be found in helper.js
function statString(array) {
    return percent(array).toString() + '% (' + array[0].toString() + '/' + sum(array).toString() + ')';
}

// Updates the user's score and prints it to the screen
function updateStats(isCorrect) {
    var handString = hand.storageString();
    if (playerStats[handString] == undefined) {
        playerStats[handString] = {
            attempts: [0, 0],
            lastAttempt: Date.now() - 1000*60*20
        };
    }

    var handType = hand.handType();
    var handStats = playerStats[handString];

    incrementStat(playerStats[handType], isCorrect);
    incrementStat(handStats.attempts, isCorrect);
    playerStats.handsAttempted += 1;

    updateMasteryPoints(handType, handStats);
    updateProgressBars();

    // Reset lastHundredCorrect every one hundred hands
    // NOTE: This must follow updateMasteryPoints because mastery calculations involve lastHundredCorrect
    if (playerStats.handsAttempted % 100 == 0) playerStats.lastHundredCorrect = 0;
    // Increment lastHundredCorrect if the answer was correct
    if (isCorrect) playerStats.lastHundredCorrect += 1;
    // Update lastAttempt to the current time
    handStats.lastAttempt = Date.now();

    // Save to local storage
    savePlayerStats()
}

function incrementStat(stat, isCorrect) {
    stat[isCorrect ? 0 : 1] += 1;
}

function makeStatArray(handType) {
    var numCorrect = playerStats[handType][0];
    var numIncorrect = playerStats[handType][1];
    return [numCorrect != null ? +numCorrect : 0, numIncorrect != null ? +numIncorrect : 0]
}

function updateMasteryPoints(handType, handStats) {
    var pointsPerHand = {'splitHands': 2, 'softHands': 4, 'hardHands': 10};
    var basePoints = 1/pointsPerHand[handType];
    var currentMasteryPoints = playerStats.masteryPoints[handTypes.indexOf(handType)];
    if (currentMasteryPoints < 100) {
        var attemptsMultiplier = percent(handStats.attempts)/100;
        var temporalModifier = 1 - Math.exp((handStats.lastAttempt - Date.now()) * Math.pow(10, -6));
        playerStats.masteryPoints[handTypes.indexOf(handType)] += basePoints * attemptsMultiplier * temporalModifier;
        // Make sure
        if (currentMasteryPoints > 100) playerStats.masteryPoints[handTypes.indexOf(handType)] = 100;
        playerStats.mastery = mastery()
    }
}

function mastery() {
    // var lastHundredModifier = playerStats.lastHundredCorrect/100;
    //
    // var allHandsModifier = 0;
    // for (var i in handTypes) allHandsModifier += percent(makeStatArray(handTypes[i]))
    // allHandsModifier /= 100*handTypes.length;

    var masteryPoints = playerStats.masteryPoints;
    var masteryCompletion = sum(masteryPoints)/masteryPoints.length;
    console.log(sum(playerStats.masteryPoints));

    return masteryCompletion; //*Math.max(lastHundredModifier, allHandsModifier)
}
