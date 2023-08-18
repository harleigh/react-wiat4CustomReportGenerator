import { useState, useEffect  } from "react";
import {FileAccess} from "./components/FileAccessor" 
import {PrettyDisplay} from "./components/PrettyDisplay";
import {processCsvFile} from './js-utilities/processCsvFile'

export default function Wiat4ReportGenerator() {

    const [fileContents, setFileContents] = useState("")
    //const [scoresDict, setScoresDict] = useState("")

    useEffect(() => {
        if (fileContents!=="") {
            console.log("I am going to process the CSV File")
            processCsvFile(fileContents)
        }
    }, [fileContents]);


    

    return (
        <>
        <h1> Wiat-4 Report Generator</h1>
        <div>
            <FileAccess fileContents={fileContents}
                        setFileContents={setFileContents}/>
        </div>
        <div>
            <PrettyDisplay fileContents={fileContents}/>
        </div>
        </>
    )
}