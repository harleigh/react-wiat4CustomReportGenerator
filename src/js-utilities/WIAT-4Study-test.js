/**
 * toying with a personalized wiat-4 test report generator
 */

const Student_Name = "John Doe"


/**
 * Keys: Composites of the wiat-4 test
 * Values: all subtests of the composite
 */
const compositesDict = {
    "Oral Language": ["Listening Composition", "Oral Expression"], 
    "Phonological Processing": ["Pseudoword Decoding", "Phonemic Proficiency"],
    "Orthographic Processing Extended": ["Orthographic Fluency", "Spelling", "Orthographic Choice"],
    "Reading":  ["Word Reading", "Reading Comprehension"],
    "Basic Reading (and Decoding)": ["Pseudoword Decoding", "Phonemic Proficiency", "Word Reading"],
    "Reading Fluency": ["Oral Reading Fluency", "Orthographic Fluency", "Decoding Fluency"],
    "Written Expression": ["Spelling", "Sentence Composition", "Essay Composition"],
    "Writing Fluency": ["Sentence Writing Fluency"],
    "Mathematics": ["Math Problem Solving", "Numerical Operations"],
    "Math Fluency": ["Math Fluency-Addition", "Math Fluency-Subtraction", "Math Fluency-Multiplication"]
}

/**
 * Keys: Subtests of the wiat-4 test
 * Values: components of the subtest (if any--if none then []); not too many of the subtests
 *         have components
 * Additionally, some subtests are referenced multiple times in the wiat-4 exam, but they only
 * appear once in this dictionary (as the scores etc are simply referenced)
 */
const subTests = {
    //"Oral Language" composite
        "Listening Composition": ["Receptive Vocabulary", "Oral Discourse Comprehension"],
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

    //"Basic Reading (and Decoding)" composite (where Word Reading and Phonemic Proficiency are referenced)
        "Pseudoword Decoding":[],

    //"Reading Fluency" composite (where Orthographic Fluency is referenced )
        "Oral Reading Fluency":[],
        "Decoding Fluency":[],

    //"Written Expression" composite
        "Spelling":[],
        "Sentence Composition":["Sentence Building", "Sentence Combining"],
        "Essay Composition":[], 

    //"Writing Fluency" composite
        "Sentence Writing Fluency":[],

    //"Mathematics" composite
        "Math Problem Solving":[],
        "Numerical Operations":[],

    //"Math Fluency" composite
        "Math Fluency-Addition":[],
        "Math Fluency-Subtraction":[], 
        "Math Fluency-Multiplication":[]
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
 * Practice and testing code
 */
console.log(compositesDict)
console.log(compositesDict["Oral Language"].length)

for(var c in compositesDict) {
    var subtests = compositesDict[c];
    //console.log(value)
    const str = "The " + c +" Composite is calculated based on " + Student_Name + "'s performances across the "+ getSubtestNames(subtests) + " subtests."
    console.log(str)
    console.log()
}