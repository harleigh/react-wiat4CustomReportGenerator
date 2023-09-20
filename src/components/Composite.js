import {setPossessive} from '../js-utilities/namePossessive'
import {compositesToSubtestsDict,
        getMeasure,
        compositesWithRefsDict,
        parentOfRefsDict} from "../js-utilities/WIAT-4-Tests"
import {Subtest} from './Subtest'

//ssi: Student Specific Information (for the current composite)
/**
 * A composite of the WIAT-4 test contains one or more subtests, each
 * subtest can have 0-3 components (tests of the subtest)
 *  compositeName: Name of this current composite
 *  StudentName:   name of student who took the exam
 *  testInformation: a dictionary in the form of {TestName: [Score, Student Specific Info]}
 * 
 * this component returns a fully filled-out composite of the WIAT-4 exam, complete
 * with all descriptions, student specific information, scores of the composite, all
 * subtests, and any components to the subtests.
 */
/**
*  Note: The Writing Fluency Composite only has one subtest "Sentence Writing Fluency" since the
* "Alphabet Writing Fluency" is only administered to grades 3 and below (so we will see some)
* special logic regarding conjugation etc.
* 
*/
export function Composite({compositeName, studentName, testInformation}) {

    const subtestNames = compositesToSubtestsDict[compositeName];   
    const [score, ssi] = testInformation[compositeName]
    
    /**
     * Fancy code to return bolded subtest names in oxford comma format
     */
    const buildSubtestNames = () => {
        const lastIdx = subtestNames.length-1;

        const formatedNames =  subtestNames.map(
            (v, idx) => {
                if( idx===lastIdx ){    //TODO
                    return <div key={idx} style={{display:"inline"}}> and <strong > {v} </strong></div> 
                }
                else {
                    return <div key={idx} style={{display:"inline"}}>{idx>0&&idx<lastIdx? ",":""}<strong> {v}</strong></div>
                } 
            })//end map

        return(
            <div style={{display:"inline"}}>
                {formatedNames}
            </div> 
        )
    }// end building the subtest names

    //TODO:
    //only one compsite does not have a score,and that is because it's made of only one subtest
    const buildCompositeConclusion = () => {
        const measure = getMeasure(score);
        if( measure ==="Not Applicable"){
            return(
                <>
                A score for {setPossessive(studentName)} overall performance in this composite
                is <strong>Not Applicable</strong>.
                </>
            )
        } else {
            return (
                <>
                {setPossessive(studentName)} overall performance within this composite scored
                within the <strong>{getMeasure(score)}</strong> range, with a standard
                score of <strong>{score}</strong>.
                </>
            )
        }
    }// end build conclusion

    const buildCompositeDescription = () => {

        return ( <>
                The <em>{compositeName}</em> composite is based on {setPossessive(studentName)} 
                {subtestNames.length===1? " performance on the":" performances across the "}
                {buildSubtestNames()}
                {subtestNames.length===1? " subset":" subtests"}.
                </>
        )
    }// end building the description of the composite


    /**
     * Build all of the subtests for this current comonent.
     * 
     * Some of the subtests are repeated from another compsite, so we
     * check if the current composite contains referenced tests, and
     * if it does, then we find the original composite that had the
     * subtest.
     */
    const buildAllSubtests = () => {

        const allSubtestsOfComposite = subtestNames.map( (subtest, idx) => {
            var parentToRef = ""
            if (compositeName in compositesWithRefsDict){
                parentToRef = parentOfRefsDict[subtest]
            }
            return (
                <li key={idx}>
                    <Subtest subtestName={subtest}
                        studentName={studentName}
                        testInformation={testInformation}
                        parentCompositeToRef={parentToRef}/>
                </li>
            )
        })//end map

        //all subtests of this current composite
        return allSubtestsOfComposite
    }//end building all of the subtests of the current composite



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
}// end composite component
