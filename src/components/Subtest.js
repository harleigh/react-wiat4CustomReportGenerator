import {testDescriptionDict, subTestsDict, getMeasure} from "../js-utilities/WIAT-4-Tests"
import { Component } from "./Component"

//testInformation contains student specific info and test scores
//a subtest may be repeated (and in these scenarios, a reference is given in the report)
export function Subtest({subtestName, studentName, testInformation, parentCompositeToRef}) {

    const [score, ssi] = testInformation[subtestName]
    const components = subTestsDict[subtestName]
    const hasComponents = components.length
    //hasComponents?console.log("We have Components " + components):console.log("No components for this subtest")



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
            }
        )

        return(
            <div style={{display:"inline"}}>
                {formatedNames}
            </div> 
        )
    }// end building the subtest names

    const buildAllComponents =  () => {
        const res = components.map( (compName, idx) => {

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
                {res}
            </ol>
            </>
        )
    }

    const buildSubtestConclusion = () => {
        return (
            <>
            {studentName}'s overall performance within this subtest scored
            within the <strong>{getMeasure(score)}</strong> range, with a standard score of <strong>{score}</strong>.
            </>
        )
    }// end build conclusion

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


    //note, if no parental composite to reference, the string is empty
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
}//
