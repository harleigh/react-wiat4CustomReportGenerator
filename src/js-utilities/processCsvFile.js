import {compositesDict, subTestsDict} from './WIAT-4-Tests'
/**
 * 
 */
export function processCsvFile( fileContents ){
    const data = {}

    //note, csv files have \r for last record in row
    const rows = fileContents.split('\r\n')
    console.log(rows)
/* 
    const res = rows.find( r => r.includes("Oral Expression"))
    console.log("Search Result", res)

    const [key, score, ssd] = res.split(",")
    console.log(key, score, ssd)
    data[key] = [score, ssd]
    console.log(data)
  */   
     for(const c in compositesDict) {
        collectEntry(data, rows, c)
        console.log("Compsite:", c)
        const allSubtests = compositesDict[c];
        console.log("   Subtests", allSubtests)
         for( const subtest of allSubtests) {
            console.log("   I am collecting data for ", subtest)
            collectEntry(data, rows, subtest)
            const allComponents = subTestsDict[subtest]
            console.log("      Components", allComponents)
            for( const component of allComponents) {
                console.log("      I am collecting data for", component)
                collectEntry(data, rows, component)
            } 
        } 
    }

    console.log(data)
    //find(a =>a.includes("#")
}

function collectEntry(dataDict, dataRows, testName){
    const [key, score, ssd] = getData(dataRows, testName)
    dataDict[key] = [score, ssd]
}

function getData(dataRows, testName){
    const entry = dataRows.find( r => r.includes(testName))
    console.log(" I tried to find ", testName, "and got", entry )
    const [key, score, ssd] = entry.split(",")
    //console.log("I searched for ", testName)
    //console.log("I Found: ", key, score, ssd)
    return [key, score, ssd]
}
