This project generates a custom report from a wiat4 exam via data stored in a csv file, and takes into account specific student information for each composite, subtest, or component to a subtest.

There is a sample of the expected csv formatting in this project (see FormatForTemplateOfScores.csv). All you need do, for each composite/subtest/component is input the score and any student specific data you might have for that test (you may have none, that is fine).

This program works in browser, and from the browser you can copy the generated report and move it to your word-editor of choice for final conlcusions etc.



A general breakdown of the WIAT-4 test and the terminology used:
* There are ten Composites of the test
* Each Composite is composed of sub-tests (e.g. the "Sentence Composition" composite is composed of two subtests: Sentence Building and Sentence Combining)
* Some subtests have components (which are two or more tests in the subtest). For example the "Oral Language" composite has a subtest "Listening Comprehension", and this subtest has two components: "Receptive Vocabulary" and "Oral Discourse Comprehension"
* Some composites will reference a subtest (repeat it). For example: the composite "Basic Reading (and Decoding) references the subtest "Word Reading", and the subtest "Word Reading" is first found in  the composite "Reading". This project manages all of the repeats, and you need only input the scores once into the csv file (i.e. the program will take care of the references)


