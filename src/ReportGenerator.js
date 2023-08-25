import { useState, useEffect  } from "react";
import {FileAccess} from "./components/FileAccessor" ;
import {Header} from "./components/Header"
import {processCsvFile} from './js-utilities/processCsvFile';
import {Composite} from "./components/Composite";
import {compositesToSubtestsDict} from "./js-utilities/WIAT-4-Tests"


/**
 * Topmost component of the Report Generator project.
 */
export default function Wiat4ReportGenerator() {

    /**
     * fileContents is the raw text of the csv file which is
     * processed in the "processCsvFile" function.
     * 
     * allTestDataDict is keyed on the test (composite, subtest
     * or component) and the value is [score, ssi] (ssi is student
     * specific information for said test). When this data is set,
     * we know we can generate the entire report
     */
    const [fileContents, setFileContents] = useState("")
    const [allTestDataDict, setScoresDict] = useState("")

    /**
     * Data used within the report that are fed to components
     */
    const studentName = allTestDataDict["Name of Student"]
    const examinerName = allTestDataDict["Examiner Name"]
    const dateOfExam = allTestDataDict["Date of Testing"]


    /**
     * Process the CSV file once the file contents are read
     * fileContents is set by the File Access component (where
     * we upload a file then process said file)
     * Note: useEffect runs on Mount, so don't process the csv file
     * if the file contentes are empty
     */
    useEffect(() => {        
        if (fileContents!=="") {
            const allWiat4Data = processCsvFile(fileContents)
            setScoresDict( allWiat4Data )
        }
    }, [fileContents]);


    /**
     * Returns an array of Composite components, taking in their name, the name
     * of the student, and the test dictionary (all tests, scores, and student
     * specific information)
     * 
     * Note: There is no alteration of the lists (i.e. no addition or deletion) so 
     * using the index for the key is just fine.
     */
    const generateAllComposites= () => {

        const allCompositeNames = Object.keys(compositesToSubtestsDict)
        const allCompositeComponents = allCompositeNames.map( (compositeName, idx) => {
            return (
                <div className="compositeBody" key={idx}>
                    <Composite compositeName={compositeName}
                                        studentName={studentName}
                                        testInformation={allTestDataDict}/>
                </div>
            )
        })//end map

        return allCompositeComponents
    
    }// end generateing all the components


    /**
     * Select all the contents of the given element ID; used in the
     * Select All button (which selects all text in the generated
     * report)
     */
    const  selectElementContents = (elementId) => {
        if(allTestDataDict===""){return}
        
        var range = document.createRange();
        range.selectNodeContents(elementId);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }//end selecting all of the contents of an element via their id



    return (
        <>
        <div className="titleBanner">
            <h1>WIAT-4 Report Generator</h1>
        </div>
        
        {/* Where the user browses and uploads a csv file, and then presses
            a button to process the csv file */}
        <div className="csvUploader">
            <FileAccess setFileContents={setFileContents}/>
        </div>

        {/* A button, when clicked, selects all of the text in the generated
            wiat-4 report (so user can copy to clipboard and do whatever post work) */}
        <div>
            <button className="selectAllInReport"
                    onClick={() => selectElementContents(document.getElementById("wiat4Report"))}
                    disabled={allTestDataDict===""}>Select All in Report</button>
        </div>

        {/* Here it is: This is the generated wiat-4 report based on the csv the user
            processed */}
        <div className="wiat4Report" id="wiat4Report">

            {/* The header is pretty boiler-plate stuff with identifying information 
                (who took the test, who administered the test, and general information on
                the wiat-4 test) */}
            <div className="reportHeader">
                {allTestDataDict!=="" && <Header sName={studentName}
                                                examinerName={examinerName}
                                                date={dateOfExam}/>}
            </div>

            {/* The wiat-4 test is broken into ten "composites", each composite has
                one or more subtests, and some subtests have two or more components (which
                I consider parts of the subtest) */}
            <div className="composites">
                { allTestDataDict!=="" &&   generateAllComposites() }
            </div>

            {/* Since the user is going to paste the report into their word editor of
                choice, the conclusion section only has the title; the user can supply
                this specific information in their editor of choice (e.g. notepad++). Some
                users like to have bulleted lists etc; it just felt akward to have a rich
                textbox as a part of this report generator (and the csv file approach could
                not manage special details like bulleted or numbered lists etc)  */}
            <div className="conclusion">
                { allTestDataDict!==""  &&   <h2><strong><u>Conclusions:</u></strong></h2> }
            </div>
        </div>
        </>
    )
}// end of the wiat-4 report generator component