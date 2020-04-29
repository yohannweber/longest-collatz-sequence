

function getBiggestCollatzSequence(methodType) {
    const bigestRangeInteger = 10000;
    const startTime = Date.now();

    var currentInteger = 1;
    var integerFinded = 1;
    var stepsReach = 0;

    switch (methodType) {
        case 'BruteForce':
            while (currentInteger <= bigestRangeInteger) {
                const currentStepsReach = iterationsResultsBruteForce(currentInteger, 0);
                if (currentStepsReach > stepsReach) {
                    integerFinded = currentInteger;
                    stepsReach = currentStepsReach;
                }
                currentInteger++;

            }

        case 'LinearArray':
            var integersIterationsResults = [];
            integersIterationsResults[1] = 0;

            for (currentInteger = 2; currentInteger <= bigestRangeInteger; currentInteger++) {
                integersIterationsResults[currentInteger] = iterationsResults(currentInteger, 0, integersIterationsResults);
            }
            const result = integersIterationsResults.reduce((acc, next, index, array) => acc[1] < next ? [index, next] : acc, [0, 0]);
            var integerFinded = result[0];
            var stepsReach = result[1];
            break;


        case 'NoLinearMap':
            var integerIterationsResultsMap = new Map();
            while (currentInteger <= bigestRangeInteger) {
                iterationsResultsNoLinearMap2(currentInteger, integerIterationsResultsMap);
                currentInteger++;
            }
            const resultMap = reduceMap(integerIterationsResultsMap, bigestRangeInteger);
            integerFinded = resultMap[0];
            stepsReach = resultMap[1];
            break;
    }

    console.log("Integer with longest Collatz sequence")
    console.log("Method : " + methodType)
    console.log("Range : 1 to " + bigestRangeInteger);
    console.log(integerFinded + " with " + stepsReach + " steps reach");
    const timeElapsed = Date.now() - startTime;
    console.log("computing time : " + timeElapsed + "ms");
}



function iterationsResults(integer, iterationsCount, integersIterationsResults) {
    return integer <= integersIterationsResults.length - 1 ? integersIterationsResults[integer] + iterationsCount : iterationsResults(nextInteger(integer), iterationsCount + 1, integersIterationsResults);
}



function nextInteger(integer) {
    return integer % 2 === 0 ? integer / 2 : integer * 3 + 1;
}
/*
function constructIterationsArray(integer, iterationsCount, iterationsResults) {
    if (integer <= iterationsResults.length - 1)
        return [...iterationsResults, iterationsResults[integer] + iterationsCount]
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
}*/

function iterationsResultsNoLinearMap(integer, resultsMap) {
    var stepAlreadyCounted = integer === 1 ? 0 : resultsMap.get(integer);
    if (stepAlreadyCounted !== undefined) {
        return new Map([[integer, stepAlreadyCounted]]);
    }
    else {
        var map1 = new Map();
        map1 = iterationsResultsNoLinearMap(nextInteger(integer), resultsMap);
        return new Map([...map1, ...new Map([[integer, Array.from(map1.values()).reduce((prev, curr) => prev < curr ? curr : prev) + 1]])]);
    }
}

function iterationsResultsNoLinearMap2(integer, resultsMap) {
    var stepAlreadyCounted = integer === 1 ? 0 : resultsMap.get(integer);
    if (stepAlreadyCounted !== undefined) {
        return new Map([[integer, stepAlreadyCounted]]);
    }
    else {
        var map1 = new Map();
        map1 = iterationsResultsNoLinearMap(nextInteger(integer), resultsMap);
        //return new Map([...map1, ...new Map([[integer, Array.from(map1.values()).reduce((prev, curr) => prev < curr ? curr : prev) + 1]])]);
       resultsMap.set(integer, Array.from(map1.values()).reduce((prev, curr) => prev < curr ? curr : prev) + 1);
    }
}

function iterationsResultsBruteForce(integer, iterationsCount) {
    return integer === 1 ? iterationsCount : iterationsResultsBruteForce(nextInteger(integer), iterationsCount + 1)
}

function reduceMap(map, maxKey){
    const result = [0,0];
    for (let [k, v] of map) {
      if ( k <= maxKey && v > result[1])  {
        result[0] = k;
        result[1] = v;
      }
    }
    return result;
}

/*
getBiggestCollatzSequence('BruteForce');*/
getBiggestCollatzSequence('LinearArray');
getBiggestCollatzSequence('NoLinearMap');

