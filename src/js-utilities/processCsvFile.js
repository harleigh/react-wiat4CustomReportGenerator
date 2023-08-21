import {compositesDict, subTestsDict} from './WIAT-4-Tests'
/**
 * 
 */
export function processCsvFile( fileContents ){
    const data = {}

    //note, csv files have "\r" for last record in row
    const rows = fileContents.split('\r\n')
    console.log(rows)

    getHeaderInfo(data, rows)
    

     for(const c in compositesDict) {
        collectTestEntry(data, rows, c)
        //console.log("Compsite:", c)
        const allSubtests = compositesDict[c];
        //console.log("   Subtests", allSubtests)
         for( const subtest of allSubtests) {
            //console.log("   I am collecting data for ", subtest)
            collectTestEntry(data, rows, subtest)
            const allComponents = subTestsDict[subtest]
            //console.log("      Components", allComponents)
            for( const component of allComponents) {
                //console.log("      I am collecting data for", component)
                collectTestEntry(data, rows, component)
            } 
        } 
    }

    console.log(data)
}

/**
 * Pulling Student Name, Student Pronoun,
 * Examiner Name, Date of Test.
 */
function getHeaderInfo(dataDict, rows){
    for(let i=0; i<3; i++) {
        const [key, val] = rows[i].split(",")
        //console.log("key ", key, " value ", val)
        dataDict[key] = val;
    }
}

function collectTestEntry(dataDict, dataRows, testName){
    let [key, score, ssd] = [NaN, NaN, NaN]
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
