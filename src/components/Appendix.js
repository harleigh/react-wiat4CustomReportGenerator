import { compositesToSubtestsDict,
         subTestsToComponentsDict, 
         getMeasure } from '../js-utilities/WIAT-4-Tests'

export function Appendix( {studentName, testData} ) {
    return (
        <>
        <h2><strong><u>Appendix:</u></strong></h2>
        
        <table>
            <tr>
                <th> Test  </th>
                <th> Score </th>
                <th> Measure </th>
            </tr>
        </table>
        </>
    )
}