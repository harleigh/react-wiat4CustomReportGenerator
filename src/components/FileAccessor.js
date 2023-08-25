import { useState } from "react";


/**
 * Basic component lets you pick a single csv file out and then
 * presents a button that, when pressed stores the file contents,
 * as plain text, for futher processing
 */
export function FileAccess({setFileContents}) {
    const [csvFileObj, setCvsFileObj] = useState("");
    

    /**
     * Pre: the csvFile has been set by the onChange event of the
     *      <input> component
     * Post: We read the entire contents of the csv file 
     *       and set them so the parent component can process the
     *       data
     */
    const onProcessCsvFile = () =>{
        
        const fileReader = new FileReader();
        //setting the onload functionality of the file reader
        fileReader.onload = (e)=> {
            const text = e.target.result;
            setFileContents(text)
        }
        //read the csv file as text with the onload behaviour set as above
        fileReader.readAsText(csvFileObj)
    }

   
    return(
        <>
            <div className="csvTitle">
                Upload CSV File
            </div>
            
            {/* File uploader, to state a single csv file for processing */}
            <div className="csvBody">
                <label htmlFor="csv-selector">
                    Select a file:
                 </label>
                <input type="file"
                    id="csv-selector"
                    name="csv-selector"
                    accept=".csv"
                    onChange={ (e) => setCvsFileObj(e.target.files[0])}
                    multiple={false}/>

                {/* Button to Process the Uploaded File:
                    I did not want to automatically process whatever csv file was selected
                    by the user in the <input> bit, instead I wanted them to make sure they
                    have the desired file, and activly choose to process the file */}
                <div className="csvButton">
                    <button onClick={onProcessCsvFile}
                            disabled={csvFileObj===""}> Process CSV File </button>
                </div>
            </div>
        </>
    );
}//end file access component