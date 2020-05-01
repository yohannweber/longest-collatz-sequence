

function getBiggestCollatzSequence(methodType) {
    const bigestRangeInteger = 1000000;
    const startTime = Date.now();
    var computingTime;

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
            computingTime = Date.now() - startTime;
            const result = integersIterationsResults.reduce((acc, next, index, array) => acc[1] < next ? [index, next] : acc, [0, 0]);
            var integerFinded = result[0];
            var stepsReach = result[1];
            break;

        case 'NoLinearArray':
            var integersIterationsResults = [];
            integersIterationsResults[0] = 0;
            integersIterationsResults[1] = 0;

            for (currentInteger = 2; currentInteger <= bigestRangeInteger; currentInteger++) {
                if (integersIterationsResults[currentInteger] === undefined) {
                    var additionnalIntegers = [];
                    additionnalIntegers = NoLinearArray(currentInteger, 0, integersIterationsResults);
                    additionnalIntegers.sort((a, b) => {
                        const aIndex = parseInt(a.split('-')[0]);
                        const bIndex = parseInt(b.split('-')[0]);
                        if (aIndex < bIndex)
                            return -1;
                        if (aIndex > bIndex)
                            return 1;
                        return 0;
                    });
                    additionnalIntegers.forEach(element => {
                        const keyValue = element.split('-');
                        integersIterationsResults[keyValue[0]] = parseInt(keyValue[1]);

                    });
                }
            }
            computingTime = Date.now() - startTime;
            var resultArray = [0, 0];
            for (var i = 0; i <= bigestRangeInteger; i++) {
                const currentValue = integersIterationsResults[i];
                if (resultArray[1] < integersIterationsResults[i])
                    resultArray = [i, currentValue];
            }
            var integerFinded = resultArray[0];
            var stepsReach = resultArray[1];
            break;

        case 'NoLinearArrayNoFunc':
            var integersIterationsResults = [];
            integersIterationsResults[0] = 0;
            integersIterationsResults[1] = 0;

            for (currentInteger = 2; currentInteger <= bigestRangeInteger; currentInteger++) {
                if (integersIterationsResults[currentInteger] === undefined) {
                    integersIterationsResults[currentInteger] = NoLinearArrayNoFunc(currentInteger, integersIterationsResults);
                }
            }
            //console.log(integersIterationsResults.length);
            computingTime = Date.now() - startTime;
            var resultArray = [0, 0];
            for (var i = 0; i <= bigestRangeInteger; i++) {
                const currentValue = integersIterationsResults[i];
                if (resultArray[1] < integersIterationsResults[i])
                    resultArray = [i, currentValue];
            }
            var integerFinded = resultArray[0];
            var stepsReach = resultArray[1];
            break;


        case 'NoLinearMap':
            var integerIterationsResultsMap = new Map();
            while (currentInteger <= bigestRangeInteger) {
                const tempMap = iterationsResultsNoLinearMap(currentInteger, integerIterationsResultsMap, bigestRangeInteger)
                integerIterationsResultsMap = new Map([...integerIterationsResultsMap, ...filterMap(tempMap, bigestRangeInteger)]);
                currentInteger++;
            }
            computingTime = Date.now() - startTime;
            const resultMap = reduceMap(integerIterationsResultsMap, bigestRangeInteger);
            integerFinded = resultMap[0];
            stepsReach = resultMap[1];
            break;

        case 'NoLinearMapNoFunc':
            /*var integerIterationsResultsMap = new Map([[1, 0]]);
            while (currentInteger <= bigestRangeInteger) {
                iterationsResultsNoLinearMapNoFunc(currentInteger)
                currentInteger++;
            }

            function iterationsResultsNoLinearMapNoFunc(integer) {
                var stepAlreadyCounted = integer === 1 ? 0 : integerIterationsResultsMap.get(integer);
                if (stepAlreadyCounted === undefined) {
                    //var map1 = new Map();
                    //map1 = iterationsResultsNoLinearMapNoFunc(nextInteger(integer));
                    //integerIterationsResultsMap.set(integer, Array.from(map1.values()).reduce((prev, curr) => prev < curr ? curr : prev) + 1);
                    stepAlreadyCounted = iterationsResultsNoLinearMapNoFunc(nextInteger(integer)) + 1;
                    integerIterationsResultsMap.set(integer, stepAlreadyCounted);
                }
                return stepAlreadyCounted;
            }

            computingTime = Date.now() - startTime;
            console.log(integerIterationsResultsMap.size);
            const resultArray = reduceMap(integerIterationsResultsMap, bigestRangeInteger);
            integerFinded = resultArray[0];
            stepsReach = resultArray[1];*/
            break;
    }

    console.log("Integer with longest Collatz sequence")
    console.log("Method : " + methodType)
    console.log("Range : 1 to " + bigestRangeInteger);
    console.log(integerFinded + " with " + stepsReach + " steps reach");
    const timeElapsed = Date.now() - startTime;
    console.log("computing time : " + computingTime + "ms");
    console.log("total time : " + timeElapsed + "ms");
}



function iterationsResults(integer, iterationsCount, integersIterationsResults) {
    return integer <= integersIterationsResults.length - 1 ? integersIterationsResults[integer] + iterationsCount : iterationsResults(nextInteger(integer), iterationsCount + 1, integersIterationsResults);
}

function NoLinearArray(integer, iterationsCount, integersIterationsResults) {
    var stepAlreadyCounted = integer === 1 ? 0 : integersIterationsResults[integer];
    if (stepAlreadyCounted !== undefined) {
        return [integer + '-' + stepAlreadyCounted]
    }
    else {
        const additionnalIntegers = NoLinearArray(nextInteger(integer), iterationsCount, integersIterationsResults);
        var integerResult = 0;
        integerResult = parseInt(additionnalIntegers[0].split('-')[1]);
        integerResult++;
        return [integer + '-' + integerResult.toString()].concat(additionnalIntegers);
    }

}

function NoLinearArrayNoFunc(integer, integersIterationsResults) {
    var stepAlreadyCounted = integer === 1 ? 0 : integersIterationsResults[integer];
    if (stepAlreadyCounted === undefined) {
        stepAlreadyCounted = NoLinearArrayNoFunc(nextInteger(integer), integersIterationsResults) + 1;
        integersIterationsResults[integer] = stepAlreadyCounted;
    }
    return stepAlreadyCounted;

}

function nextInteger(integer) {
    return integer % 2 === 0 ? integer / 2 : integer * 3 + 1;
}

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



function iterationsResultsBruteForce(integer, iterationsCount) {
    return integer === 1 ? iterationsCount : iterationsResultsBruteForce(nextInteger(integer), iterationsCount + 1)
}
function filterMap(map, maxKey) {
    const result = new Map();
    for (let [k, v] of map) {
        if (k <= maxKey) {
            result.set(k, v);
        }
    }
    return result;

}
function reduceMap(map, maxKey) {
    const result = [0, 0];
    for (let [k, v] of map) {
        if (k <= maxKey && v > result[1]) {
            result[0] = k;
            result[1] = v;
        }
    }
    return result;
}


//getBiggestCollatzSequence('BruteForce');
/*getBiggestCollatzSequence('LinearArray');
getBiggestCollatzSequence('NoLinearMap');
getBiggestCollatzSequence('NoLinearMapNoFunc');*/
getBiggestCollatzSequence('NoLinearArrayNoFunc');
getBiggestCollatzSequence('LinearArray');

