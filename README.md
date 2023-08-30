This project generates a custom report from a wiat-4 exam via data stored in a csv file, and takes into account specific student information for each composite, subtest, or component to a subtest, as well as conclusions section the teacher may have regarding student and the exam.

There is a sample of the expected csv formatting in this project (see FormatForTemplateOfScores.csv). All you need do, for each composite/subtest/component is input the score and any student specific data you might have for that test (you may have none, that is fine), as well as a conclusion (if you have any).

This program works in browser, and from the browser you can copy the generated report and move it to your word-editor of choice for final conlcusions etc.

How do I use it?
1. At start up:![image](https://github.com/harleigh/react-wiat4CustomReportGenerator/assets/4912070/c3584d9b-89f6-497f-8f5b-76c9aab3ba05)

2. Select your csv file: ![image](https://github.com/harleigh/react-wiat4CustomReportGenerator/assets/4912070/c635597f-dfb8-44e8-859e-ef07908b0b16)

3. Hit button "Process CSV File" and the report gets generated: ![image](https://github.com/harleigh/react-wiat4CustomReportGenerator/assets/4912070/549b3876-fa21-420a-82d9-8eec68001f3c)

Note: Hitting the "Select All in Report" button selects all of the generated report, so you can paste it into whatever editing software you like to write your conclusions:
![image](https://github.com/harleigh/react-wiat4CustomReportGenerator/assets/4912070/549cfba4-530e-4dcd-9f55-22ed1ff9c252)

Example of Report Generation: Here is the Oral Language Composite section of the report generated from the sample csv file in this directory (for student specific information, I keep is generic like "Student Data Here"):
![image](https://github.com/harleigh/react-wiat4CustomReportGenerator/assets/4912070/7912b5ba-3da3-4dc3-b8db-dc93723d9171)

Example of repeated subtests: Student specific information is not repeated when a subtest is repeated from another composite, rather the reader is told to please reference the composite where the subtest first appeared:![image](https://github.com/harleigh/react-wiat4CustomReportGenerator/assets/4912070/569b52d7-fb61-4faf-9c1c-366dbffe3a3c)

Example of the conclusion: Your conclusion will be generated in the report with all of the formatting you choose to do in the csv file, which means you can have lists and such: ![image](https://github.com/harleigh/react-wiat4CustomReportGenerator/assets/4912070/ac7c91b5-8acd-4d22-929e-95072a0cd663)


A general breakdown of the WIAT-4 test and the terminology used:
* There are ten Composites of the test
* Each Composite is composed of sub-tests (e.g. the "Sentence Composition" composite is composed of two subtests: Sentence Building and Sentence Combining)
* Some subtests have components (which are two or more tests in the subtest). For example the "Oral Language" composite has a subtest "Listening Comprehension", and this subtest has two components: "Receptive Vocabulary" and "Oral Discourse Comprehension"
* Some composites will reference a subtest (repeat it). For example: the composite "Basic Reading (and Decoding) references the subtest "Word Reading", and the subtest "Word Reading" is first found in  the composite "Reading". This project manages all of the repeats, and you need only input the scores once into the csv file (i.e. the program will take care of the references)

From one teacher to the next: I hope this report generator saves you (the teacher) some time.


