import {testDescriptionDict, getMeasure} from "../js-utilities/WIAT-4-Tests"

//testInformation contains student specific info and test scores
//components are never repeated from another category in the wiat-4 exam
export function Component({componentName, studentName,  testInformation}) {

    const [score, ssi] = testInformation[componentName]

    
    // [[Student_Name]]'s overall performance within this composite scored within the [[Very Low]] range, with a standard score of 73.
    const buildComponentConclusion = () => {
        return (
            <>
            {studentName}'s performance within this component scored
            within the <strong>{getMeasure(score)}</strong> range, with a standard score of <strong>{score}</strong>.
            </>
        )
    }// end build conclusion

    const buildComponentDescription = () => {
        //console.log("I am trying to find testDescriptionDict[componentName], where key is ", componentName)
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

}