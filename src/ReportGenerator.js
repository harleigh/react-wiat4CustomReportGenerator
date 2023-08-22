import { useState, useEffect  } from "react";
import {FileAccess} from "./components/FileAccessor" ;
import {PrettyDisplay} from "./components/PrettyDisplay";
import {Header} from "./components/Header"
import {processCsvFile} from './js-utilities/processCsvFile';

import { Composite } from "./components/Composite";

export default function Wiat4ReportGenerator() {

    const [fileContents, setFileContents] = useState("")
    const [allTestDataDict, setScoresDict] = useState("")

    const studentName = allTestDataDict["Name of Student"]
    const studentPronoun = allTestDataDict["Pronoun of Student"]
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


    
    return (
        <>
        <div className="titleBanner">
            <h1> Wiat-4 Report Generator</h1>
        </div>
        
        <div className="fileAccessor">
            <FileAccess fileContents={fileContents}
                        setFileContents={setFileContents}/>
        </div>
        <div className="reportHeader">
            {allTestDataDict!=="" && <Header sName={studentName}
                                             sPronoun={studentPronoun}
                                             examinerName={examinerName}
                                             date={dateOfExam}/>}
        </div>
        <div className="reportBody">
            <Composite compositeName={"Orthographic Processing Extended"}
                       studentName={"Student-Name"}
                       studentPronoun={"They"}
                       ssi={"Student Specific Info here."}
                       score={"88"}/>
        </div>

        <div>
            <PrettyDisplay fileContents={fileContents}/>
        </div>
        </>
    )
}