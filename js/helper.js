// Selects a random option from an array of choices
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Returns the cumulative sum of the numbers in an array
function sum(array) {
    var total = 0;
    for (var i in array) total += array[i]
    return total
}

function round(value, decimals) {
    return Number(Math.round(Number(value+'e'+decimals))+'e-'+decimals);
}

// Parameter ARRAY is of the form [numberCorrect, numberIncorrect]
function percent(array) {
    var s = sum(array);     // numberOfAttempts
    return s == 0 ? 0 : Math.round(100 * array[0]/s);
}
