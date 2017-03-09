// Main function for running blackjack app
// Initializes necessary elements and prepares events
$(document).ready(function () {
    var historicalStats = localStorage.getItem('playerStats');
    if (historicalStats != null) playerStats = JSON.parse(historicalStats);
    else initializePlayerStats();
    // SEE global variable in buttons.js
    response = $('#response');
    // Sets up deal button to run the deal function
    $('#deal').click(function () {
        response.css('visibility', 'hidden');
        deal()
    });
    $('select option').css('background', '#737373');
    // Generates lookup tables for deciding hands [SEE decide.js and Hand.js]
    createTables(true, true);
    // Initialize global buttons variable [SEE button.js]
    optionButtons = $('.option');
    initializeButtons();    // SEE buttons.js
    // Sets up interface for additional rule selections
    initializeCheckboxes(); // SEE initializeCheckboxes.js
    // Initialize mastery progress bar
    masteryProgressBar = new CircularProgressBar('mastery-progress-bar', 55, 5, '#00ff99');
    splitHandsProgressBar = new CircularProgressBar('split-hands-progress-bar', 40, 4, '#3399ff');
    softHandsProgressBar = new CircularProgressBar('soft-hands-progress-bar', 40, 4, '#ffcc00');
    hardHandsProgressBar = new CircularProgressBar('hard-hands-progress-bar', 40, 4, '#ff6600');
    updateProgressBars();
    deal()
});


function setup() {
}
