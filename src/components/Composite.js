import {compositesDict, getMeasure, compositesWithRefsDict, parentOfRefsDict} from "../js-utilities/WIAT-4-Tests"
import {Subtest} from './Subtest'

//ssi: Student Specific Information (for the current composite)
export function Composite({compositeName, studentName, testInformation}) {

    const subtestNames = compositesDict[compositeName];   
    const [score, ssi] = testInformation[compositeName]
    
    /**
     * Fancy code to return bolded subtest names in oxford comma format
     */
    const buildSubtestNames = () => {
        const lastIdx = subtestNames.length-1;

        const formatedNames =  subtestNames.map(
            (v, idx) => {
                if( idx===lastIdx){
                    return <div key={idx} style={{display:"inline"}}> and <strong > {v} </strong></div> 
                }
                else {
                    return <div key={idx} style={{display:"inline"}}>{idx>0&&idx<lastIdx? ",":""}<strong> {v}</strong></div>
                } 
            }
        )

        return(
            <div style={{display:"inline"}}>
                {formatedNames}
            </div> 
        )
    }// end building the subtest names


    // [[Student_Name]]'s overall performance within this composite scored within the [[Very Low]] range, with a standard score of 73.
    const buildCompositeConclusion = () => {
        return (
            <>
            {studentName}'s overall performance within this composite scored
            within the <strong>{getMeasure(score)}</strong> range, with a standard score of <strong>{score}</strong>.
            </>
        )
    }// end build conclusion

    const buildCompositeDescription = () => {
        
        return ( <>
                The <em>{compositeName}</em> composite is based on {studentName}'s performances
                across {buildSubtestNames()} subsets.
                </>
        )
    }// end building the description of the composite


    const buildAllSubtests = () => {

        const res = subtestNames.map( (subtest, idx) => {
            var parentToRef = ""
            if (compositeName in compositesWithRefsDict){
                parentToRef = parentOfRefsDict[subtest]
                //console.log("Subtest ", subtest, " is referenced, parent is ", parentToRef)
            }
            return (
                <li key={idx}>
                    <Subtest subtestName={subtest}
                        studentName={studentName}
                        testInformation={testInformation}
                        parentCompositeToRef={parentToRef}/>
                </li>

            )
        })
        return res
    }

    return (
        <>
        <div className="composite">
            <div className="componentTitle">
                        <h2><strong><u>{compositeName} Composite</u></strong></h2>
            </div>
            <div className="compositeBody">
                {buildCompositeDescription()}{" "+ ssi + " "}{buildCompositeConclusion()}
            </div>
            <div className="subtests">
                <ul>
                    {buildAllSubtests()}
                </ul>
            </div>
        </div>

        
        </>
    )
}

/**
 * 
 * 
 * <li>
                <Subtest subtestName={"Orthographic Fluency"}
                        studentName={studentName}
                        studentPronoun={studentPronoun}
                        testInformation={testInformation}/>
            </li>
            <li>
                <Subtest subtestName={"Spelling"}
                        studentName={studentName}
                        studentPronoun={studentPronoun}
                        testInformation={testInformation}/>
            </li>
            <li>
                <Subtest subtestName={"Orthographic Choice"}
                        studentName={studentName}
                        studentPronoun={studentPronoun}
                        testInformation={testInformation}/>
            </li>
 */