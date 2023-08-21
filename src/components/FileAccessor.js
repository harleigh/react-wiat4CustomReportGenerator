//every begining has a begining, and this is this begining. And, being that
//this is the begining, take it with a grain of salt as there is quite a road
//yet being paved; as I am learning, all code and documentation are "as is"

import { useState } from "react";

/**
 * Component returns a very basic table of each row of the cvs file 
 */



/**
 * Basic component lets you pick a single csv file out and then
 * stores the file contents in a state for futher processing
 */
export function FileAccess({fileContents, setFileContents}) {
    const [csvFileObj, setCvsFileObj] = useState("");
    

    /**
     * Pre: the csvFile has been set by the onChange event of the
     *      <input> component
     * Post: We read the entire contents of the csv file 
     */
    const onProcessCsvFile = () =>{
        if(csvFileObj===""){return;}
        const fileReader = new FileReader();
        //setting the onload functionality of the file reader
        fileReader.onload = (e)=> {
            const text = e.target.result;
            setFileContents(text)
            //process data here...
        }
        //read the csv file as text with the onload behaviour set as above
        fileReader.readAsText(csvFileObj)
    }

   
    return(
        <>
            <div className="uploadCSV">
                <h1>Upload CSV File...</h1>
            </div>
            
            <div className="fileSelector">
                <label htmlFor="csv-selector">Select a file:</label>
                <input type="file"
                    id="csv-selector"
                    name="csv-selector"
                    accept=".csv"
                    onChange={ (e) => setCvsFileObj(e.target.files[0])}
                    multiple={false}/>
                    <div className="fileSelectorButton">
                        <button onClick={onProcessCsvFile}> Process CSV File </button>
                    </div>
            </div>

                
        </>
    );
}//end file access component

//later, we can break the file access into another component;
// a parent that has a file component and a pretty display component