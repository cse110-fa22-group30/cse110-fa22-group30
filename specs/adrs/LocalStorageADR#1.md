# Decision on local storage
​
* Status: Accepted
* Deciders: John Liu and Xiaofan Mu <!-- optional -->
* Date: 2022-11-09 <!-- optional -->
​
## Context and Problem Statement
​
What implementation of CRUD is optimal for our application
​
## Decision Drivers <!-- optional -->
​
* Easy to implement so that people can quickly set up
* Easy to debug
* Ease of use
​
## Considered Options
​
* Saving information to a local file
* Local Storage
​
## Decision Outcome
​
Chosen option: We're using local storage mainly because of it is simpler and easier to use. 

## Pros and Cons of the Options <!-- optional -->
### Local File
​
* Good, easy concept
* Good, write to file allows the data to be stored locally
* Good, data not limited to a single browser (as opposed to local storage)
* Bad, Most likely will need to use a application to write to file. (ex Node.js) (dependiences?)
* Bad, not as simple as Local Storage
* Bad, this method of data storage is more susceptible to be edited by a user and break our software.
* Bad, potential jank of read/write system. (Could be mitigated by converting everything into a simple JSON file)
​
### Local Storage
​
* Good, extremely simple
* Good, less moving parts (so less likely to break)
* Good, already built into JS
* Bad, Local Storage does not persist between different browser softwares. For example, if I saved data to Google Chrome, I cannot pull this data back up using Firefox.

<!-- markdownlint-disable-file MD013 -->
