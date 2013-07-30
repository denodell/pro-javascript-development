Chapter 2 - Documenting JavaScript
==================================

* Install NodeJS from http://nodejs.org - which installs the command line tool 'npm' (Node Package Manager) - see Chapter 12 for more

* Install YUIDoc from the command prompt with the command:

npm -g install yuidocjs

* Navigate to this folder from the command prompt

* Execute the following command to generate full documentation:

 yuidoc .

This will create a new folder called 'out' within this directory.

The HTML files within represent a static site based on the documentation in your code, which is fine but if you want to really go the extra mile, use the `data.json` file as a data source for a single page responsive web app.

* Delete the 'out' folder and execute the following command instead, which only generates the data.json file:

    yuidoc . -p