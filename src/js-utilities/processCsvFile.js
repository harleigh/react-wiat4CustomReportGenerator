import { compositesToSubtestsDict,
         subTestsToComponentsDict} from './WIAT-4-Tests'
//Note: The dictionaries above ^ are the backbone of pulling data from the csv file



/**
 * There is an example of the csv file formatting in this project. We are
 * - Each entry is on it's own row
 * - For test data, the first three entries, in order are: "Stuent Name:",
 *   "Examiner Name:", "Date of Testing:". The CSV entries must match perfectly 
 * - Each composite/subtest/component(of subtest) is on it's own row with order
 *           of TestName, Score, Stuent Specific Info for said test
 * The test names in the CSV, (which are in the first column) match identically to
 * the test names in the WIAT-4-Tests file.
 * 
 * Big Note Here:
 * -The WIAT-4 has Composites that repeat tests, for example composite
 *  "Written Expression" repeats the "Spelling" subtest. The "Spelling" subtest
 *  is first in the composite "Orthographic Processing Extended".
 * 
 *  The exampe csv has all of the repeated tests removed, as why should the user
 *  imput the same score twice? the dictionaries in "WIAT-4-Tests" manage which 
 *  subtests are repeated and where they are repeated (e.g. see the dictionary
 *  "compositesWithRefsDict" etc)
 * 
 */

/**
 * we assume that the csv file has entries with the strings
 * as given below
 */
export const CSV_HEADERS = Object.freeze({
    STUDENT:     "Student Name:",
    EXAMINER:    "Examiner Name:",
    CONCLUSION:  "Conclusions:",
    TEST_DATE:   "Date of Testing:"
  })


/**
 * pull all data out of the CSV file and return it as a 
 * dictionary object keyed with the dictionaries in "WIAT-4-Tests" file 
 * 
 * fileContents is the entire contents of the csv file as a string
 * 
 * What we return:
 *      The orginization of the data dictionary is
 *           {TestName: [Score, Student Specific Data]}
 *      where testName is either a composite, subtest, or component of subtest,
 *      but there are also the header info in the dictionary (student name,
 *      examiner name, date of test) as well as the conclusion of the report).
 *      Note: "Test Data" refers to tests and the header data
 */
export function processCsvFile( fileContents ){

    //this will hold all the test data
    const dataDict = {}

    //note, csv files have "\r" for last record in row
    const rows = fileContents.split('\r\n')


    //Obtain: Name of Student, Examiner, Date of exam
    getHeaderInfo(dataDict, rows)
    

     /**
      * get all of the testing data
      */
     for(const c in compositesToSubtestsDict) {
        collectTestEntry(dataDict, rows, c)
        const allSubtests = compositesToSubtestsDict[c];
         for( const subtest of allSubtests) {
            collectTestEntry(dataDict, rows, subtest)
            /**
             * Note that (most) subtests do not have components, so we do a quick
             * check if we have some components before bullying forwards
             */
            const allComponents = subTestsToComponentsDict[subtest]
            if( allComponents ) {
                for( const component of allComponents) {
                    collectTestEntry(dataDict, rows, component)
                } 
            }
        }//subtest loop 
    }// composite loop

    collectConclusion(dataDict, fileContents)

    try{
        postValidationCsvFile(dataDict)
    }catch(e){
        console.error(e)
    }

    return dataDict
}// end processing the csv file function


/**
 * Pull the conlcusion from the file.  To keep all of the nice formatting of the one
 * who wrote it, we simply pull it from the main file-contents string (that has the 
 * entire csv file as one string)
 * 
 * @param {*} dataDict: dictionary of test data
 * @param {*} fileContentsStr the entire csv file as a string
 */
function collectConclusion( dataDict, fileContentsStr ){
    
    const idx =  fileContentsStr.indexOf(CSV_HEADERS.CONCLUSION)

    //csv file: the double comma ,, is due to the  empty cell next to
    //          the conclusion label--see the sample csv file
    //needed trim for situation when a user added a ton of newlines at end
    var conclusion = fileContentsStr.slice(idx + CSV_HEADERS.CONCLUSION.length + ",,".length).trim()

    /**
     * a csv file will put quotes around a cell if the cell contains a comma,
     * so we check if we need to trim the outside quotes off the conclusion
     */
    if(conclusion.charAt(0)==='"'){    //csv file adds quotes if detected ","
        conclusion =  conclusion.slice(1,-1)
    }

    dataDict[CSV_HEADERS.CONCLUSION] = conclusion
}//end collection of the conclusion in the csv


/**
 * Checks to see if we are missing an expected test entry in the 
 * dictionary
 * dataDict: dictionary of test data
 */
function postValidationCsvFile(dataDict) {
    if( undefined in dataDict){
        throw Error("An Entry was not found from the CSV")
    }
}

/**
 * Pulling Student Name, Examiner Name, Date of Test.
 * dataDict: dictionary of test data
 * dataRows: contents of csv file broken into rows; one row is
 *           one row of the csv file
 */
function getHeaderInfo(dataDict, dataRows){

    //obtain the student name
    var rowEntry = dataRows.find( rowEntry => rowEntry.includes(CSV_HEADERS.STUDENT))
    if(rowEntry === undefined) {
        throw new Error('Critical: I could not find "'+ CSV_HEADERS.STUDENT+'"');
    }
    var [k, v] = rowEntry.split(",")
    dataDict[k] = v;

    //obtain the examiner's name
    rowEntry = dataRows.find( rowEntry => rowEntry.includes(CSV_HEADERS.EXAMINER))
    if(rowEntry === undefined) {
        throw new Error('Critical: I could not find "' + CSV_HEADERS.EXAMINER+'"');
    }
    [k, v] = rowEntry.split(",")
    dataDict[k] = v;


    /* Obtain the Date of the Examination:
     *   Note: Date of test has a comma in it eg Jan 14, 2927
     *         because of the comma, when we save as cvs, the 
     *         spreadsheet app puts quotes about the date
     */
    rowEntry = dataRows.find( rowEntry => rowEntry.includes(CSV_HEADERS.TEST_DATE))
    if(rowEntry === undefined) {
        throw new Error('Critical: I could not find "' + CSV_HEADERS.TEST_DATE+'"');
    }

    const [key, monthDate, year] = rowEntry.split(",")
    dataDict[key] = monthDate.slice(1) + ", " + year.slice(0,-1);
}

/**
 * Here we build the test dictionary consisting of:
 *      {TestName: [student's score, student specific data/info on said test]}
 * 
 * If we can't find a test in the csv file, we stick "undefined" as a key
 * dataDict: dictionary of test data
 * dataRows: contents of csv file broken into rows; one row is
 *           one row of the csv file
 * testName: name of the test we are trying to find in the row of data 
 */
function collectTestEntry(dataDict, dataRows, testName){
    var [key, score, ssd] = [undefined, "" , ""]
    try {
        [key, score, ssd] = getTestData(dataRows, testName)
    }catch(e) {
        console.error(e);
    }
    dataDict[key] = [score, ssd]
}


/**
 * When getting test data, the Student Specific Information can possibly
 * have commas in its entry. Therefore .split(",") may return a few entries, 
 * so we just need to join them all together.
 * 
 * Also, when saving to a csv file, quotes are added for any cell entry that
 * contains the delimiter "," (so we need to pull those out)
 * 
 * 
 * dataRows: contents of csv file broken into rows; each index is
 *           one row of the csv file
 * testName: name of the test we are trying to find in the row of data 
 */
function getTestData(dataRows, testName){
    const entry = dataRows.find( rowEntry => rowEntry.includes(testName))
    if(entry === undefined) {
        throw new Error('Critical: I could not find "' + testName +'"');
    }
    
    const splitBits = entry.split(",")
    const key = splitBits[0]    //matches testName under === equality
    const score = splitBits[1]
    var ssd = splitBits.slice(2).join().trim()
    if(ssd.charAt(0)==='"'){    //csv file adds quotes if detected ","
        ssd =  ssd.slice(1,-1)
    }
    
    return [key, score, ssd]
}
