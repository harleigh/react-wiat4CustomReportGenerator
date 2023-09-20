import {setPossessive} from '../js-utilities/namePossessive'
import { testDescriptionDict,
         subTestsToComponentsDict,
         getMeasure} from "../js-utilities/WIAT-4-Tests"
import { Component } from "./Component"

//testInformation contains student specific info and test scores
//a subtest may be repeated (and in these scenarios, a reference is given in the report)
/**
 * subtestName: Name of current subtest
 * studentName: Name of student who took exam
 * testInformation: a dictionary in the form of {TestName: [Score, Student Specific Info]}
 * parentCompositeToRef: Some subtests are repeated through the WIAT-4 test (e.g. Word reading
 * is in both the Reading composite and the Basic Reading (and Decoding) Composite). If this
 * string is empty, then this subtest is not referenced elsewhere.  If this string is not
 * empty, the string is the Composite the subtest is originally administered.
 * 
 * Note: Subtest which are repeated do not have their student specific information repeated,
 *       they simply have a "see composite X for information"
 */
export function Subtest({subtestName, studentName, testInformation, parentCompositeToRef}) {

    const [score, ssi] = testInformation[subtestName]
    const components = subTestsToComponentsDict[subtestName]
    const hasComponents = (components && components.length?true:false)


    /**
     * A few subtests are built from 2 or more components, so here
     * we make them in pretty oxford comma format
     */
    const buildComponentNames = () => {
        const lastIdx = components.length-1;

        const formatedNames =  components.map(
            (v, idx) => {
                if( idx===lastIdx){
                    return <div key={idx} style={{display:"inline"}}> and <strong > {v}</strong></div> 
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

    /**
     * Pre: It's already been determined that this subtest does have
     *      components
     * Returns an ordered list of the components associated to this subtest
     */
    const buildAllComponents =  () => {
        const allComponentsToSubtest = components.map( (compName, idx) => {

            return(
                <li key={idx}>
                    <Component componentName={compName}
                               studentName={studentName}
                               testInformation={testInformation}/>
                </li>

            )
        })

        return (
            <>
            <ol>
                {allComponentsToSubtest}
            </ol>
            </>
        )
    }// end building all of the components to this subtest


    //boiler-plate conclusion for a subtest which talks about the student name
    // and the score they received
    const buildSubtestConclusion = () => {

        const measure = getMeasure(score);
        if( measure ==="Not Applicable"){
            return(
                <>
                A score for {setPossessive(studentName)} overall performance in this subtest 
                is <strong>Not Applicable</strong>.
                </>
            )
        } else {
            return (
                <>
                {setPossessive(studentName)} overall performance within this subtest scored
                within the <strong>{getMeasure(score)}</strong> range, with a standard
                score of <strong>{score}</strong>.
                </>
            )
        }
    }// end build conclusion

    /**
     * The description of the subtest must account for the scneario that certain subtests
     * have two or three components (tests of subtests) associated to it.
     */
    const buildSubtestDescription = () => {
        var numCompsDesc = ""
        const dict = {2: "two", 3:"three"}
        if(hasComponents){
            
            numCompsDesc = "This subtest includes " + dict[components.length]+ " components: "
        }

        //We only build the component names if this subtest has components
        return ( <>
                The <strong><em><u>{subtestName + " "}</u></em></strong>
                 {testDescriptionDict[subtestName] + " " + numCompsDesc}
                 {hasComponents?buildComponentNames():""}{hasComponents?".":""}
                </>
        )
    }// end building the description of the composite


    /*
        Subtests that are repeated do not repeat the student specific data, instead there is a
        small blerb telling the reader to see the comosite where the subtest is first used
        e.g. for Pseudoword Decoding, we would tell the reader to see the Phonological
        Processing component 
    */
    return (
        <>
        <div className="subtestBody">
            {buildSubtestDescription()}{" "}{!parentCompositeToRef && ssi + " "}{buildSubtestConclusion()}
            {parentCompositeToRef && " (See description under the "}<em>{parentCompositeToRef}</em>
            {parentCompositeToRef && " Composite for specifics to this test)."}
        </div>
        <div className="components">
            {hasComponents?buildAllComponents():""}
        </div>
        </>

    )
}//end component for the subtests of the wiat-4 exam
