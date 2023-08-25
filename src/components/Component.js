import {testDescriptionDict,
        getMeasure} from "../js-utilities/WIAT-4-Tests"

/**
 * Certain subtests have components (which are tests within the subtest). Components
 * never have any deeper tests; they are the leaves of the WIAT-4 test.
 * 
 * componentName: Name of current component
 * studentName: Name of student who took exam
 * testInformation: a dictionary in the form of {TestName: [Score, Student Specific Info]}
 */
export function Component({componentName, studentName,  testInformation}) {

    const [score, ssi] = testInformation[componentName]

    /**
     * Specific conclusion to the component
     */
    const buildComponentConclusion = () => {
        return (
            <>
            {studentName}'s performance within this component scored
            within the <strong>{getMeasure(score)}</strong> range,
            with a standard score of <strong>{score}</strong>.
            </>
        )
    }// end build conclusion

    /**
     * Like others, the specific description of this test is pulled from a dictionary
     * that contains all of the specific test descriptions. Be sure to see the 
     * comments in "WIAT-4-Tests.js"
     */
    const buildComponentDescription = () => {
        return ( <>
                <em>{componentName}</em>: {testDescriptionDict[componentName]}
                </>
        )
    }// end building the description of the composite

    return (
        <>
            {buildComponentDescription()}{ " " + ssi +" "}{buildComponentConclusion()}
        </>
    )

}// end the Component (of the wiat-4 exam) component :)