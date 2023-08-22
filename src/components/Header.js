
export function Header( {sName, sPronoun, examinerName, date} ) {

    const testDescription = () => {
        return (
            <p>
                To assess {sName}'s academic abilities in language processing, reading,
                writing and math, {sPronoun} was administered grade-appropriate subtests
                from the Wechsler Individual Achievement Test®, Fourth Edition (WIAT®-4).
                This assessment is a norm-referenced,  individually administered
                achievement test. The WIAT-4, consists of 20 subtests used to evaluate
                listening, speaking, reading, writing, and mathematics skills for students
                in Preschool through 12+ grades, and between the ages of 50. 
            </p>
        )
    }

    const metrics = () => {
        
        return (
            <>
            <p>
                Explanation of all measures and {sName}'s performances across these clusters
                are analyzed below. Interpretation of assessment results and standard scores
                are as follows:
            </p>
            <div>
                <ul style={ {listStyle: "none"} }>
                    <li>130 and above: Extremely High</li>
                    <li>120 to &lt; 130: Very High</li>
                    <li>110 to &lt; 120:  High Average</li>
                    <li>90 to &lt; 110: Average</li>
                    <li>80 to &lt; 90: Low Average</li>
                    <li>70 to &lt; 80: Very Low</li>
                    <li>Below 70: Extremely Low</li>
                </ul>
            </div>
            </>
        )
    }


    return(
        <>
            <div>
                <p>Name of Student: {sName} </p>
                <p>Examiner: {examinerName}</p>
                <p>Date of Examination: {date}</p>
                <p> <strong>[[WIAT-4]] Score Report</strong></p>
                {testDescription()}
                {metrics()}
            </div>
        </>
    );
}