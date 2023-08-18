import { useState } from "react";
import {FileAccess} from "./components/FileAccessor" 
import {PrettyDisplay} from "./components/PrettyDisplay";


export default function Wiat4ReportGenerator() {

    const [fileContents, setFileContents] = useState("")    //will be removed
    const scoresDict = {}


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