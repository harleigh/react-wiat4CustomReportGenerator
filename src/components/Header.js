/**
 * A component that is text-only providing basic information regarding the WIAT-4 exam
 * In: Student Name, Name of person who administered the exam, and date of examination
 * 
 */
export function Header( {studentFullName, studentFirstName, examinerName, date} ) {

    /**
     * Basic description of WIAT-4 test for the generated report; apparently this is very
     * helpful for SPED teachers who receive students from out of state, as tests differ
     * from state to state (and every decade or so from what I've heard)  
     */
    const testDescription = () => {

        return (
            <p>
                To assess {studentFirstName}'s academic abilities in language processing, reading,
                writing and math, {studentFirstName} was administered grade-appropriate subtests
                from the Wechsler Individual Achievement Test®, Fourth Edition (WIAT®-4).
                This assessment is a norm-referenced,  individually administered
                achievement test. The WIAT-4, consists of 20 subtests used to evaluate
                listening, speaking, reading, writing, and mathematics skills for students
                in Preschool through 12+ grades, and between the ages of 50. 
            </p>
        )
    }

    /**
     *  Explanation of the Metrics for the WIAT-4 test, like testDescription(), this is
     *  helpful for SPED teachers who might receive a student from out of state and are
     *  not familiar with the WIAT-4 test. Metrics are so important, as it's how we measure!
     */
    const metrics = () => {
        
        return (
            <>
            <p>
                Explanation of all measures and {studentFirstName}'s performances across these clusters
                are analyzed below. Interpretation of assessment results and standard scores
                are as follows:
            </p>
            <div>
                <ul className="noBullList">
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
                <h3><strong>WIAT-4 Score Report</strong></h3>
            </div>
            <div>
                <p>Name of Student: {studentFullName} </p>
                <p>Examiner: {examinerName}</p>
                <p>Date of Examination: {date}</p>
                {testDescription()}
                {metrics()}
            </div>
        </>
    );
}