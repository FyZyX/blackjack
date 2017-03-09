var optionButtons, response;

function enableButtons() { optionButtons.prop('disabled', false) }

function disableButtons() { optionButtons.prop('disabled', true) }

// Sets up click events for all options buttons and stat reset button
function initializeButtons() {
    optionButtons.click(function () {
        var isCorrect = decide() == $(this).prop('id');  // Returns Boolean: TRUE if the user made the correct guess, FALSE otherwise

        // updateStats can be found in stats.js
        updateStats(isCorrect);
        response.css('visibility', 'visible');
        response.html(isCorrect ? 'Correct!' : 'Try again');
        if (isCorrect) {
            disableButtons();
            $(this).addClass('correct');
        }
    });

    $('#reset-stats-btn').click(function () {
        initializePlayerStats();
        updateProgressBars();
        updateButtons()
    })
}

// Buttons are updated each time a new hand is dealt [SEE deal() in Hand.js]
function updateButtons() {
    optionButtons.removeClass('correct');
    enableButtons()
}
