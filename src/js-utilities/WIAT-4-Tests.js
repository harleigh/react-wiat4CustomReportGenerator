/**
 * The most critical bit of the project is in this file. We have dictionaries, keyed on 
 * the names of the tests (be they composite, subtest or component) that tie together the
 * structure of the WIAT-4 Exam
 */


/**
 * This Dictionary tells us what subtests are associated with each Composite.
 * 
 * Keys: Composites of the wiat-4 test
 * Values: all subtests of the composite
 * 
 * Note: There is an issue with the character U+2013 "–" with ASCII 
 *       character U+002d "-", the lesser known "–" came from a copy/
 *       paste from a wiat-4 exam
 */
export const compositesToSubtestsDict = {
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
 * This dictionary tells us what components are associated with each subtest
 * 
 * Keys: Subtests of the wiat-4 test
 * Values: components of the subtest (if any--if none then []); not too many of the subtests
 *         have components
 * Additionally, some subtests are referenced multiple times in the wiat-4 exam, but they only
 * appear once in this dictionary (as the scores etc are simply referenced)
 */
export const subTestsToComponentsDict = {
        "Listening Comprehension": ["Receptive Vocabulary", "Oral Discourse Comprehension"],
        "Oral Expression": ["Expressive Vocabulary", "Oral Word Fluency", "Sentence Repetition"],
        "Sentence Composition":["Sentence Building", "Sentence Combining"],
}

/**
 * This includes descriptions of all subtests and components to subtests
 * Note: The composites descriptions are generated in the composite component;
 *       these subtests and their component-exams have specific descriptions about
 *       the process of specific tests.
 * 
 * 
 * Possible TODO: Make these into a file, perhaps, if the user wants to change them; like
 * a seperate csv file where the user describes each test to their desire.
 */
export const testDescriptionDict = {
    "Listening Comprehension": "subtest is designed to measure listening comprehension at the level of the word, sentence, and passage.",
    "Receptive Vocabulary": "Students select the picture that best illustrates the meaning of each target word spoken by the examiner.",
    "Oral Discourse Comprehension":  "Students listen to passages presented via audio recording then respond aloud to comprehension questions asked by the examiner.",
    "Oral Expression": "subtest is designed to measure a student's oral expression at the word and sentence level. It is appropriate for children grades Preschool through 12+ grade.",
    "Expressive Vocabulary": "Students see a picture and hear a definition and respond with the word that best corresponds to the picture and definition given.",
    "Oral Word Fluency": "Students name as many items as possible belonging to a given category within one minute.",
    "Sentence Repetition": "Students listen to a sentence and then repeat it verbatim. Sentences increase in length and complexity as the student progresses through the subtest.",
    "Pseudoword Decoding": "subtest is designed to measure phonic decoding skills among students in grades 1-12+. The student is asked to read a list of pseudowords aloud.",
    "Phonemic Proficiency": "subtest measures the development of phonological/phonemic skills. The student responds orally to items that require manipulation of the sounds within words.  Tasks include elision (the omission of a sound or syllable when speaking), substitution, and reversal of sounds.  Items are presented via audio recording, and scoring incorporates both speed and accuracy.",
    "Orthographic Fluency": "subtest is designed to be administered to children in grades 1 through 12+. It measures an examinee's sight vocabulary, or orthographic lexicon. Students are asked to read aloud a list of irregularly spelled words as quickly as possible during two timed trials.",
    "Spelling": "subtest measures written spelling from dictation.  The student writes words that are dictated within the context of a sentence.",
    "Orthographic Choice": "subtest measures the student's ability to match a picture with a vocabulary word given orally.",
    "Word Reading":  "subtest is designed to measure letter and letter-word knowledge and single word reading among children grades Preschool through 12+ grade. In part 1, examinees identify letters and match letters to sounds.  In part 2, examines read aloud a list of regularly and irregularly spelled words.",
    "Reading Comprehension": "subtest measures reading comprehension skills at the level of the word, sentence and passage.  To measure passage comprehension, students read narrative and expository passages and answer literal and inferential comprehension questions asked by the examiner.  Students can refer to the passage as needed to answer the question",
    "Oral Reading Fluency": "subtest is designed to be administered to students in grades 1-12+. Student performance on this task is measured through student ability to read two passages aloud. The subtest standard score is calculated based on the average number of words read correctly per minute across the two passages. Examinees answer a question after each passage to encourage reading with comprehension, but that subtask is not used in the calculation of the student's score. Reading prosody(patterns of rhythm and sound) is evaluated using a qualitative scale.",
    "Sentence Composition": "subtest is designed to measure sentence formulation skills.  Responses are scored based on semantics, grammar, capitalization and the use of internal and ending punctuation.",
    "Sentence Building": "Students write sentences that each include a target word without changing the target word.",
    "Sentence Combining": "Students combine the ideas from two or three given sentences into one sentence.",
    "Essay Composition": "subtest is designed to measure spontaneous writing fluency at the discourse level within a 10 minute time frame.  Students in grades 3-12+ are asked to write a descriptive expository essay within a 10-minute time limit.  Essays are scored for semantics, grammar and mechanics.  Content and organization are also evaluated using qualitative rubric.",
    "Sentence Writing Fluency": "subtest is designed to measure sentence composition fluency. Examinees write a sentence for each item using a target word, completing as many items as possible within 5 minutes. Scoring incorporates the number of words written, use of the target word, and subject-verb agreement.",
    "Math Problem Solving": "subtest measures a range of math problem-solving skill domains including basic concepts, everyday applications, geometry, and algebra.  Students in Preschool through 12+ grades are asked to point to pictures or respond orally to items that require the application of mathematical principles to real-life situations.",
    "Numerical Operations": "subtest measures math calculation skills among children in grades Kindergarten through 12+ grades.  For early items, a student responds orally to questions about number concepts and counting.  For later items, the student writes answers to printed math problems ranging from basic operations with integers to geometry, algebra, and calculus problems.",
    "Math Fluency–Addition": "Students solve as many single-digit addition problems as they can in one minute",
    "Math Fluency–Subtraction":"Students solve as many single-digit subtraction problems as they can in one minute", 
    "Math Fluency–Multiplication":"Students solve as many single-digit multiplication problems as they can in one minute"
}

/**
 * There are a few composites that reference previously discussed subtests.  For these, the
 * reporting changes (e.g. no student-specific info is discussed, only a reference is placed
 * in the report--e.g. "see Reading Fluency composite for Student Name's performance in 
 *  Orthographic Fluency")
 */
export const compositesWithRefsDict = {
    "Basic Reading (and Decoding)": ["Pseudoword Decoding", "Phonemic Proficiency", "Word Reading"],
    "Reading Fluency": ["Orthographic Fluency"],
    "Written Expression": ["Spelling"]
}

/**
 * This dictionary tells us where the repeated subtest originally appears
 * For example: "Pseudoword Decoding" is repeated in the composite "Basic Reading (and Decoding)",
 *              and is first discussed in "Phonological Processing", so in the report, at the 
 *              repeated test, we say, "Hey, go look at "Phonological Processing" for the student
 *              specific info" (because we don't want to display it twice)
 */
export const parentOfRefsDict ={
    "Pseudoword Decoding": "Phonological Processing",
    "Phonemic Proficiency": "Phonological Processing",
    "Word Reading": "Reading",
    "Orthographic Fluency": "Orthographic Processing Extended",
    "Spelling": "Orthographic Processing Extended"
}


/**
 * Utility function
 *  130 and above Extremely High
    120 to < 130 Very High
    110 to < 120 High Average
    90 to  < 110 Average
    80 to  <  90 Low Average
    70 to  <  80 Very Low
    Below 70 Extremely Low
*/
export const  getMeasure = (studentScore) =>{
    const score = Number(studentScore)
    let measureForScore = ""
    if( score<70 ) {
        measureForScore= "Extremely Low"
    }else if( score>=70 && score<80  ) {
        measureForScore= "Very Low"
    }else if( score>=80 && score<90  ) {
        measureForScore= "Low Average"
    }else if(score>=90 && score<110){
        measureForScore="Average"
    }else if(score>=110 && score<120){
        measureForScore="High Average"
    }else if(score>=120 && score<130){
        measureForScore="Very Average"
    }else if(score>=130) {
        measureForScore="Extreamly High"
    }else {
        measureForScore= "Not Applicable"
    }
    return measureForScore
}
