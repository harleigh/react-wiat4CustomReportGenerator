
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
            <div style={{marginLeft: '20px'}}>
                <p>130 and above Extremely High</p>
                <p>120 to 130 Very High</p>
                <p>110 to 120  High Average</p>
                <p>90-110 Average</p>
                <p>80 to 90 Low Average</p>
                <p>70 to 80 Very Low</p>
                <p>Below 70 Extremely Low</p>
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