import { useState, useEffect  } from "react";
import {FileAccess} from "./components/FileAccessor" ;
import {Header} from "./components/Header"
import {processCsvFile} from './js-utilities/processCsvFile';
import { Composite } from "./components/Composite";
import {compositesDict} from "./js-utilities/WIAT-4-Tests"

export default function Wiat4ReportGenerator() {

    const [fileContents, setFileContents] = useState("")
    const [allTestDataDict, setScoresDict] = useState("")

    const studentName = allTestDataDict["Name of Student"]
    const examinerName = allTestDataDict["Examiner Name"]
    const dateOfExam = allTestDataDict["Date of Testing"]

    /**
     * Process the CSV file once the file contents are read
     */
    useEffect(() => {
        //useEffect runs on Mount, so don't process the csv file  if the file contentes are empty
        if (fileContents!=="") {
            //console.log("I am going to process the CSV File")
            const allWiat4Data = processCsvFile(fileContents)
            setScoresDict( allWiat4Data )
        }
    }, [fileContents]);


    const generateAllComposites= () => {

        const allCompositeNames = Object.keys(compositesDict)
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
    }

    const  selectElementContents = (el) => {
        if(allTestDataDict===""){
            return
        }
        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        //console.log(sel)
        //console.log(document.getSelection().toString())
        //navigator.clipboard.writeText(document.getSelection().toString())
    }


    return (
        <>
        
        <div className="titleBanner">
            <h1> Wiat-4 Report Generator</h1>
        </div>
        
        <div className="csvUploader">
            <FileAccess fileContents={fileContents}
                        setFileContents={setFileContents}/>
        </div>
        <button onClick={() => selectElementContents(document.getElementById("wiat4Report"))}/>
        <div className="wiat4Report" id="wiat4Report">
            <div className="reportHeader">
                {allTestDataDict!=="" && <Header sName={studentName}
                                                examinerName={examinerName}
                                                date={dateOfExam}/>}
            </div>
            <div className="composites">
                { allTestDataDict!=="" &&   generateAllComposites() }
            </div>
        </div>
        </>
    )
}

/* 
        <div className="compositeBody">
            { allTestDataDict!=="" &&<Composite compositeName={"Written Expression"}
                                        studentName={"Student-Name"}
                                        testInformation={allTestDataDict}/>}
        </div>
*/