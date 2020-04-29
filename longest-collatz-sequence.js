

function getBiggestCollatzSequence() {
    const bigestRangeInteger = 1000000;
    var integersIterationsResults = [];
    integersIterationsResults[1] = 0;

    for (currentInteger = 2; currentInteger <= bigestRangeInteger; currentInteger++) {
        integersIterationsResults[currentInteger] = iterationsResults(currentInteger, 0, integersIterationsResults);
        // var max = max < iterationsResults(currentInteger, 0). ? ;
        //integersIterationsResults = constructIterationsArray(currentInteger, 0, integersIterationsResults)

        /*var collatzSequence = [];
        collatzSequence = iterationsResultsImproved(currentInteger, [], integersIterationsResults);
        collatzSequence.find()*/
    }
    const result = integersIterationsResults.reduce((acc, next, index, array) => acc[1] < next ? [index, next] : acc, [0, 0]);
    console.log("Integer with longest Collatz sequence")
    console.log("Range : 1 to " + bigestRangeInteger);
    console.log(result[0] + " with " + result[1] + " steps reach");
}


function iterationsResults(integer, iterationsCount, integersIterationsResults) {
    return integer <= integersIterationsResults.length - 1 ? integersIterationsResults[integer] + iterationsCount : iterationsResults(nextInteger(integer), iterationsCount + 1, integersIterationsResults);
}



function nextInteger(integer) {
    return integer % 2 === 0 ? integer / 2 : integer * 3 + 1;
}

function constructIterationsArray(integer, iterationsCount, iterationsResults) {
    if (integer <= integersIterationsResults.length - 1)
        return [...iterationsResults, integersIterationsResults[integer] + iterationsCount]
    else {
        var lIterationsCount = iterationsCount + 1;
        return constructIterationsArray(nextInteger(integer), lIterationsCount, iterationsResults);
    }

}

function iterationsResultsWithoutArray(integer, iterationsCount) {
    if (integer === 1)
        return iterationsCount
    else {
        var lIterationsCount = iterationsCount + 1;
        return iterationsResultsWithoutArray(nextInteger(integer), lIterationsCount);
    }
}

function iterationsResultsImproved(integer, collatzSequence, resultsArray) {
    var lCollatzSequence = [...collatzSequence, integer]
    return resultsArray[integer] !== -1 ? lCollatzSequence : iterationsResultsImproved(nextInteger(integer), lCollatzSequence, resultsArray);
}

getBiggestCollatzSequence();

