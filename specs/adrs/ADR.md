# {Decision on local storage}
​
* Status: {accept}
* Deciders: {team leaders} <!-- optional -->
* Date: {2022-11-09} <!-- optional -->
​
## Context and Problem Statement
​
We were discussing whether to use NodeJS or Python for the backend.
​
## Decision Drivers <!-- optional -->
​
* Easy to implement so that people can quickly set up
* Easy to debug
​
## Considered Options
​
* JavaScript
* Python
​
## Decision Outcome
​
Chosen option: {Python} mainly because of its flexibility and extendability. In addition. our backend team members are very familiar with the tools needed for our application (sqlite, requests, etc), so it will be easier to implement and debug. We successfully establish network communication using Flask.
​
## Pros and Cons of the Options <!-- optional -->
### {Javascript}
​
* Good, easy to get help from TA
* Good, easier for new members to follow up with Node.js since we are learning this in class
* Good, we have done some Lab with Node.js that we can just use some of the information there
* Bad, mostly bigger project are on Python
* Bad, hard to debug since most functions are asynchronous
​
### {Python}
​
* Good, our backend members are really good at Python (They are really familiar with it)
* Good, lots of existing libraries to use
* Bad, hard to introduce new members to Python
* Bad, hard to set up an HTTP server for communication with the frontend
​
<!-- markdownlint-disable-file MD013 -->
