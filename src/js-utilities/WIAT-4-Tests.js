
/**
 * Keys: Composites of the wiat-4 test
 * Values: all subtests of the composite
 */
export const compositesDict = {
    "Oral Language": ["Listening Comprehension", "Oral Expression"], 
    "Phonological Processing": ["Pseudoword Decoding", "Phonemic Proficiency"],
    "Orthographic Processing Extended": ["Orthographic Fluency", "Spelling", "Orthographic Choice"],
    "Reading":  ["Word Reading", "Reading Comprehension"],
    "Basic Reading (and Decoding)": ["Pseudoword Decoding", "Phonemic Proficiency", "Word Reading"],
    "Reading Fluency": ["Oral Reading Fluency", "Orthographic Fluency", "Decoding Fluency"],
    "Written Expression": ["Spelling", "Sentence Composition", "Essay Composition"],
    "Writing Fluency": ["Sentence Writing Fluency"],
    "Mathematics": ["Math Problem Solving", "Numerical Operations"],
    "Math Fluency": ["Math Fluency–Addition", "Math Fluency–Subtraction", "Math Fluency–Multiplication"]
}

/**
 * Keys: Subtests of the wiat-4 test
 * Values: components of the subtest (if any--if none then []); not too many of the subtests
 *         have components
 * Additionally, some subtests are referenced multiple times in the wiat-4 exam, but they only
 * appear once in this dictionary (as the scores etc are simply referenced)
 */
export const subTestsDict = {
    //"Oral Language" composite
        "Listening Comprehension": ["Receptive Vocabulary", "Oral Discourse Comprehension"],
        "Oral Expression": ["Expressive Vocabulary", "Oral Word Fluency", "Sentence Repetition"],

    //"Phonological Processing" composite
        "Pseudoword Decoding": [],
        "Phonemic Proficiency":[],

    //"Orthographic Processing Extended" composite
        "Orthographic Fluency":[],
        "Spelling":[],
        "Orthographic Choice":[],

    //"Reading" composite
        "Word Reading":[],
        "Reading Comprehension":[], 

    //"Basic Reading (and Decoding)" composite
        //is built from subtests from other locations

    //"Reading Fluency" composite (where Orthographic Fluency is referenced )
        "Oral Reading Fluency":[],
        "Decoding Fluency":[],

    //"Written Expression" composite ; Spelling is referenced earlier
        "Sentence Composition":["Sentence Building", "Sentence Combining"],
        "Essay Composition":[], 

    //"Writing Fluency" composite
        "Sentence Writing Fluency":[],

    //"Mathematics" composite
        "Math Problem Solving":[],
        "Numerical Operations":[],

    //"Math Fluency" composite
        "Math Fluency–Addition":[],
        "Math Fluency–Subtraction":[], 
        "Math Fluency–Multiplication":[],
}

/**
 * Format a list of subtest names into a comma seperated string
 * @param {*} list a list of subtest names 
 * @returns a string with oxford (?) commas
 *   e.g. IN:  ["Orthographic Fluency", "Spelling", "Orthographic Choice"]
 *        OUT: "Orthographic Fluency, Spelling and Orthographic Choice"
 */
const getSubtestNames = (list) => {
    const lastSubtest = list.pop()
    if(list.length > 0) {
        return list.join(", ") + " and " + lastSubtest;
    }
    else {
        return lastSubtest
    }
}


/**
 *  130 and above Extremely High
    120 to 130 Very High
    110 to 120  High Average
    90-110   Average
    80 to 90 Low Average
    70 to 80 Very Low
    Below 70 Extremely Low
*/
const getMeasure = (studentScore) =>{
    const amt = Number(studentScore)
    switch(amt) {
        case ( amt < 70 ):
            return "Extremely Low"
        case ( 70<= amt && amt < 80):
            return "Very Low"
        case ( 80<= amt && amt < 90):
            return "Low Average"
        case ( 90<= amt && amt < 110):
            return "Average"
        case ( 110<= amt && amt < 120):
            return "High Average"
        case ( 120<= amt && amt < 130):
            return "Very High"
        case ( 130<= amt):
            return "Extremely High"
        default:
            return "Score Not Found"
    }
}




/**
 * Practice and testing code
 */
/* console.log(compositesDict)
console.log(compositesDict["Oral Language"].length)
const Student_Name = "Student_Name"
for(var c in compositesDict) {
    var subtests = compositesDict[c];
    //console.log(value)
    const str = "The " + c +" Composite is calculated based on " + Student_Name + "'s performances across the "+ getSubtestNames(subtests) + " subtests."
    console.log(str)
    console.log()
} */