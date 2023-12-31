import {setPossessive} from '../js-utilities/namePossessive'
import { compositesToSubtestsDict,
         subTestsToComponentsDict, 
         getMeasure } from '../js-utilities/WIAT-4-Tests'


/**
 * The appendix generates a table of each test score and measure.
 */
export function Appendix( {studentName, testData} ) {

    const buildTableContents = () => {
        const tableEntries = []
        var uniqueKey = 0

        //note this table will never be edited, so a key based on an "index" is fine
        const buildRow = (testName,score) => {
            uniqueKey= uniqueKey+1
            tableEntries.push(
                <tr key={uniqueKey}>
                    <td> {testName} </td>
                    <td> {score}</td>
                    <td> {getMeasure(score)} </td>
                </tr>
            )
        }

        for(const c in compositesToSubtestsDict) {
            buildRow(c, testData[c][0])            
            const allSubtests = compositesToSubtestsDict[c];
             for( const subtest of allSubtests) {
                buildRow(subtest, testData[subtest][0])
                /**
                 * Note that (most) subtests do not have components, so we do a quick
                 * check if we have some components before bullying forwards
                 */
                const allComponents = subTestsToComponentsDict[subtest]
                if( allComponents ) {
                    for( const component of allComponents) {
                        buildRow(component, testData[component][0])
                    } 
                }
            }//subtest loop 
        }// composite loop
        return tableEntries
    }
    

    return (
        <>
        <h2><strong><u>Appendix:</u></strong></h2>
        <p> The following table summarizes {setPossessive(studentName)} performance on the WIAT-4 test: </p>
        <table>
            <thead>
                <tr>
                    <th> Test  </th>
                    <th> Standard Score </th>
                    <th> Measure </th>
                </tr>
            </thead>
            <tbody>
                {buildTableContents()}
            </tbody>
        </table>
        </>
       
    )
}