This project generates a custom report from a wiat-4 exam via data stored in a **.csv** file, and takes into account specific student information for each composite, subtest, or component to a subtest, as well as conclusions section the teacher may have regarding student and the exam.

#

### Specific Formatting:

This program expects certain information to be within specific places, with specific names.  There are two files, in this project directory that provide the expected formatting:
1. A .xlsx file: "FormatForTemplateOfScores.xlsx" which will be the file you use to enter your test data and conclusions.
2. A raw .csv file: "FormatForTemplateOfScores.csv" (which was *generated* from the .xlsx file -- you *don't* want to directly edit a csv file).

**Expected formatting:** In short, 
* Never alter the information in the First Column of the spreadsheet (unless you want to fork this project and make a version yourself--be sure to follow the open source licence!)
* Never change cell orientation (e.g. merge), the report generator is expecting the formatting given in the example provided in this project directory
* Student specific data for a specific test/composite must be contained in *one* cell exactly to the right of said test/composite (it can be as long as you want, or even empty; you might want to turn on word wrapping so you can read the cell well.)

**My Recomended Work Flow for CSV Generation:**
1.  Open the .xlsx version (found in this project directory) in either Excel or Google Sheets.
2.   Enter all of your data, observations, etc in the appropriate places--e.g. student data for a test goes in the cell-row of said test. Note: Do not edit the first column of the spreadsheet where the test names are located, and all student data must be contained within the cell to the right of the test score.
3.   When you have finished with all of your data, save your spreadsheet in **.csv** format: If you are using excel you must save the file in "CSV UTF-8 (Comma Delimited)" format. If you are using google sheets, simply save as (.csv) file.
4.   The .csv file you generated in step 3 is what will be used by this program to generate your report!  Go generate your report and take some me time; you deserve it!   


#
### How do I use the program?
1. At start up:![image](https://github.com/harleigh/react-wiat4CustomReportGenerator/assets/4912070/c3584d9b-89f6-497f-8f5b-76c9aab3ba05)

2. Browse and select your .csv file (see "My Recomended Work Flow:" above for .csv generation): ![image](https://github.com/harleigh/react-wiat4CustomReportGenerator/assets/4912070/c635597f-dfb8-44e8-859e-ef07908b0b16)

3. Hit button "Process CSV File" and the report gets generated: ![image](https://github.com/harleigh/react-wiat4CustomReportGenerator/assets/4912070/549b3876-fa21-420a-82d9-8eec68001f3c)

#
### Highlights of the Report Generator:

* Example of Report Generation: Here is the Oral Language Composite section of the report generated from the sample csv file in this directory (for student specific information, I keep is generic like "Student Data Here"):
![image](https://github.com/harleigh/react-wiat4CustomReportGenerator/assets/4912070/7912b5ba-3da3-4dc3-b8db-dc93723d9171)

* Hitting the "Select All in Report" button selects all of the generated report, so you can paste it into whatever editing software you like and upload it to wherever your needs are:
![image](https://github.com/harleigh/react-wiat4CustomReportGenerator/assets/4912070/549cfba4-530e-4dcd-9f55-22ed1ff9c252)


* Managing Repeated Subtests: Student specific information is *not* repeated when a subtest is repeated from another composite, rather the reader is told to please reference the composite where the subtest first appeared:![image](https://github.com/harleigh/react-wiat4CustomReportGenerator/assets/4912070/569b52d7-fb61-4faf-9c1c-366dbffe3a3c)

* Example of the conclusion: Your conclusion will be generated in the report with *all* of the formatting you choose to do in your .csv file. This means you can have lists and such: ![image](https://github.com/harleigh/react-wiat4CustomReportGenerator/assets/4912070/ac7c91b5-8acd-4d22-929e-95072a0cd663)

#

A general breakdown of the WIAT-4 test and the terminology used:
* There are ten Composites of the test
* Each Composite is composed of sub-tests (e.g. the "Sentence Composition" composite is composed of two subtests: Sentence Building and Sentence Combining)
* Some subtests have components (which are two or more tests in the subtest). For example the "Oral Language" composite has a subtest "Listening Comprehension", and this subtest has two components: "Receptive Vocabulary" and "Oral Discourse Comprehension"
* Some composites will reference a subtest (repeat it). For example: the composite "Basic Reading (and Decoding) references the subtest "Word Reading", and the subtest "Word Reading" is first found in  the composite "Reading". This project manages all of the repeats, and you need only input the scores once into the csv file (i.e. the program will take care of the references)


From one teacher to the next: I hope this report generator saves you (the teacher) some time.


