import {compositesDict, subTestsDict} from './WIAT-4-Tests'

/**
 * pull all data out of the CSV file and return it as a 
 * dictionary object keyed with the dictionaries in "WIAT-4-Tests" file 
 */
export function processCsvFile( fileContents ){
    const dataDict = {}

    //note, csv files have "\r" for last record in row
    const rows = fileContents.split('\r\n')
    //console.log(rows)

    try{ 
        preValidationCsvFile(rows)
    }catch(e) {
        console.error(e)
    }

    getHeaderInfo(dataDict, rows)
    

     for(const c in compositesDict) {
        collectTestEntry(dataDict, rows, c)
        //console.log("Compsite:", c)
        const allSubtests = compositesDict[c];
        //console.log("   Subtests", allSubtests)
         for( const subtest of allSubtests) {
            //console.log("   I am collecting data for ", subtest)
            collectTestEntry(dataDict, rows, subtest)
            const allComponents = subTestsDict[subtest]
            //console.log("      Components", allComponents)
            for( const component of allComponents) {
                //console.log("      I am collecting data for", component)
                collectTestEntry(dataDict, rows, component)
            } 
        } 
    }
    try{
        postValidationCsvFile(dataDict)
    }catch(e){
        console.error(e)
    }

    //console.log(dataDict)
    return dataDict
}


function preValidationCsvFile(rows) {
    const numCols = rows[0].split(",").length
    if(  numCols >3 ){
        throw Error("Warning: Too many columns in CSV file. I expected 3, but found ", numCols)
    }
}

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

function collectTestEntry(dataDict, dataRows, testName){
    let [key, score, ssd] = [undefined, "", ""]
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
    //console.log(" I tried to find ", testName, "and got", entry )
    const [key, score, ssd] = entry.split(",")
    //console.log("I searched for ", testName)
    //console.log("I Found: ", key, score, ssd)
    return [key, score, ssd]
}
