// Sets up the functionality of checkboxes representing additional rules or conditions
function initializeCheckboxes() {
    var doubleButton = $('#double');
    var surrenderButton = $('#surrender')
    var doubleAllowed = $('#double-allowed');
    var doubleAfterSplit = $('#double-after-split');
    var surrenderAllowed = $('#surrender-allowed');

    // Redefine lookup tables based on rule changes
    function updateLookupTables() {
        // createTables() can be found in createTables.js
        createTables(doubleAllowed.prop('checked'), doubleAfterSplit.prop('checked'));
        // updateButtons() can be found in buttons.js
        updateButtons()
    }

    // Handle CHANGE events for DOUBLE rule
    var previousStateDoubleAfterSplit = true;
    doubleAllowed.change(function () {
        if (!doubleAllowed.prop('checked')) {   // If doubling becomes disallowed
            // Remember if double after split was allowed previously
            previousStateDoubleAfterSplit = doubleAfterSplit.prop('checked');
            // Make sure double after split is not checked
            doubleAfterSplit.prop('checked', false);
            // Get rid of the option button for double down
            doubleButton.css('display', 'none');
            // Disable double after split
            doubleAfterSplit.prop('disabled', true);
        } else {    // if doubling becomes allowed
            // Revert double after split option to previous state
            doubleAfterSplit.prop('checked', previousStateDoubleAfterSplit);
            // Display double down button
            doubleButton.css('display', 'inline');
            // Enable double after split
            doubleAfterSplit.prop('disabled', false);
        }
        updateLookupTables()
    });

    // Handle CHANGE event for DOUBLE AFTER SPLIT rule
    doubleAfterSplit.change(updateLookupTables);

    // Handle CHANGE event for SURRENDER rule
    surrenderAllowed.change(function () {
        // Toggle surrender button display
        var displayState = surrenderAllowed.prop('checked') ? 'inline' : 'none';
        surrenderButton.css('display', displayState)
    })
}