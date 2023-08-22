import {compositesDict} from "../js-utilities/WIAT-4-Tests"




/**
 *  130 and above Extremely High
    120 to 130 Very High
    110 to 120  High Average
    90-110   Average
    80 to 90 Low Average
    70 to 80 Very Low
    Below 70 Extremely Low
*/
export const  getMeasure = (studentScore) =>{
    const amt = Number(studentScore)

    if( amt<70 ) {
        return "Extremely Low"
    }else if( amt>=80 && amt<90  ) {
        return  "Very Low"
    }else if(amt>=90 && amt<110){
        return "Average"
    }else if(amt>=110 && amt<120){
        return "High Average"
    }else if(amt>=120 && amt<130){
        return "Very Average"
    }else {
        return "Extreamly High"
    }
}


export function Composite({compositeName, studentName, studentPronoun, ssi, score}) {

    const subtestNames = compositesDict[compositeName]

    /**
     * Fancy code to return bolded subtest names in oxford comma format
     */
    const buildSubtestNames = () => {
        const lastIdx = subtestNames.length-1
        const formatedNames =  subtestNames.map(
            (v, idx) => {
                if( idx===lastIdx){
                    return <div key={idx} style={{display:"inline"}}> and <strong > {v} </strong></div> //<div key={idx}> and <strong> {v} </strong></div>
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
    }


    // [[Student_Name]]'s overall performance within this composite scored within the [[Very Low]] range, with a standard score of 73.
    const buildConclusion = () => {
        return (
            <>
            {studentName}'s overall performance within this composite scored
            within the {getMeasure(score)} range, with a standard score of <strong>{score}</strong>.
            </>
        )
    }

    const buildDescription = () => {
        
        return ( <>
                The <em>{compositeName}</em> composite is based on {studentName}'s performances
                across {buildSubtestNames()} subsets.
                </>
        )
    }

    return (
        <>
        <div>
            {buildDescription()}&nbsp;{ssi}&nbsp;{buildConclusion()}
            <li>
                Hello
            </li>
        </div>
        </>
    )
}