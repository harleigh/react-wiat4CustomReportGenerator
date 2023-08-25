import {compositesDict, subTestsDict} from './WIAT-4-Tests'

/**
 * There is an example of the csv file formatting in this project. We are
 * -Expecting three columns
 * -Each entry is on it's own row
 * -First three entries, in order are: Stuent Name, Examiner Name, Date of Exam
 * 
 * -each composite/subtest/component(of subtest) is on it's own row with order
 *  of TestName, Score, Stuent Specific Info for said test
 * 
 * Big Assumption Here:
 * -The WIAT-4 has Composites that repeat tests, for example composite
 *  "Written Expression" repeats the "Spelling" subtest. The "Spelling" subtest
 *  is first in the composite "Orthographic Processing Extended". I assume that
 *  student specific information (SSI) is never in a referenced test, SSI is 
 *  always written where the subtest first appears. So, for our example "Spelling"
 *  would have its SSI in "Orthographic Processing Extended"; there would be no
 *  SSI for "Spelling" in "Written Expression".
 * 
 * Note on Assumption: I could have just removed all referenced tests from the
 *                     sample csv template but I thought it possibly confusing,
 *      regarding WIAT-4 testing. e.g. Basic Reading (and Decoding) is noting but
 *      referenced tests. The exmaple csv file could have all of that section 
 *      removed, but perhaps people would think "Where is Basic Reading (and Decoding)"?
 *  Who knows, perhaps I will remove all repeated subtests from the csv file, and this
 *  bit of discussion will be buried in the march of commits :) as why have people type
 *  it twice if it's used once
 * /


/**
 * pull all data out of the CSV file and return it as a 
 * dictionary object keyed with the dictionaries in "WIAT-4-Tests" file 
 * 
 * The orginization of the data dictionary is
 *     {TestName: [Score, Student Specific Data]}
 * where testName is either a composite, subtest, or component of subtest 
 */
export function processCsvFile( fileContents ){

    //this will hold all the test data
    const dataDict = {}

    //note, csv files have "\r" for last record in row
    const rows = fileContents.split('\r\n')

    try{ 
        preValidationCsvFile(rows)
    }catch(e) {
        console.error(e)
    }

    //this is: Name of Student, Examiner, Date of exam
    getHeaderInfo(dataDict, rows)
    

    /**
     * Honesty, I think the code reads better with the tripple for loop
     * and not with the ().().().... seen with javascript :)
     */
     for(const c in compositesDict) {
        collectTestEntry(dataDict, rows, c)
        const allSubtests = compositesDict[c];
         for( const subtest of allSubtests) {
            collectTestEntry(dataDict, rows, subtest)
            const allComponents = subTestsDict[subtest]
            for( const component of allComponents) {
                collectTestEntry(dataDict, rows, component)
            } 
        } 
    }


    try{
        postValidationCsvFile(dataDict)
    }catch(e){
        console.error(e)
    }

    return dataDict
}


/**
 * Checks to see if we have three columns in a row 
 */
function preValidationCsvFile(rows) {
    const numCols = rows[0].split(",").length
    if(  numCols >3 ){
        throw Error("Warning: Too many columns in CSV file. I expected 3, but found ", numCols)
    }
}

/**
 * Checks to see if we are missing a test in the dictionary 
 */
function postValidationCsvFile(dataDict) {
    if( undefined in dataDict){
        throw Error("An Entry was not found from the CSV")
    }
}

/**
 * Pulling Student Name, Examiner Name, Date of Test.
 */
function getHeaderInfo(dataDict, rows){
    for(let i=0; i<2; i++) {
        const [key, val] = rows[i].split(",")
        dataDict[key] = val;
    }
    //date of test has a comma in it eg Jan 14, 2927
    const [key, monthDate, year] = rows[2].split(",")
    dataDict[key] = monthDate + "," + year;
}

/**
 * If we can't find a test in the csv file, we stick "undefined" as a key 
 */
function collectTestEntry(dataDict, dataRows, testName){
    var [key, score, ssd] = [undefined, "", ""]
    try {
        [key, score, ssd] = getTestData(dataRows, testName)
    }catch(e) {
        console.error(e);
    }
    dataDict[key] = [score, ssd]
}

function getTestData(dataRows, testName){
    const entry = dataRows.find( r => r.includes(testName))
    if(entry === undefined) {
        throw new Error('Critical: I could not find ' + testName);
    }
    const [key, score, ssd] = entry.split(",")
    return [key, score, ssd]
}
