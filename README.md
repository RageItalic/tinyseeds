# TinySEEDS

**DO NOT GET STARTED CODING IMMEDIATELY AFTER SETTING UP**
**REPEAT: DO NOT GET STARTED CODING IMMEDIATELY AFTER SETTING UP**
**After finishing the set up, scroll down to workflow section of the ```README``` to see how to get started coding**

## How To Set Up the Project on Your Machine
- Ensure you have Node on your machine
- Clone this project using ```git clone``` via ```https``` (option available on top right section) of the projects github page
    -  Command will look like this in the terminal: ```git clone https://{url here} tinySEEDS```
-  The project has 2 folders: Frontend and Backend. We will set up both BUT don't worry about the backend too much. 

### Setting Up the Frontend
- In terminal (from outside of the tinySEEDS folder) type:
    - first to go into the frontend folder: ```cd tinySEEDS/frontend```
    - second to install all dependencies from NPM and make sure the project has everything it needs to run: ```npm i```
    - to run the frontend: ```npm run dev```
- Once the app is running, the terminal will print out a url that you can copy and paste into your browser to see the app.
- Make sure each step finishes running before moving on to the next one.

### Test Users To Sign In As And Other Information
- We already have a few test users in our database that you can sign in as:
    - Email: ```ilamcconnell@eplode.com``` & Password: ```test123```
    - Email: ```u@ser.com``` & Password: ```test123```
    - Email: ```p@rth.com``` & Password: ```test123```
- To access the admin portal, click on the "Admin" button in the navbar and when prompted, type in ```test123``` as the password.

## Requirement Clarifications
- Backend Testing: Curl Commands
    - We do not have any curl commands to test the backend: 
        - Since we don't have a traditional backend and are cloud native. 
        - Our web application is meant to be tested in the browser with the user stories we've designed for.
- SQL Schema:
    - We did not use a traditional SQL database. Therefore, there is no SQL schema. However, we did use firebase's realtime database which is essentially a JSON object in the cloud and is therefore document based. The initial version of the document db we used is provided in the main folder on github (outside of the ```frontend``` directory). This can be imported into firebase. The version of the db in firebase can also be exported from there directly and that version will be a more up to date one.
    


## Workflow Steps
**Make sure to ALWAYS follow this whenever you start working on a feature**
- After you have set up the project and have a task from trello, in the correct folder (frontend or backend) make sure to use the ```git branch``` command to make a seperate branch for just your feature. Here's how:
    - Once your're in the right folder, type: ```git checkout -b feature/{yourFeatureNameNoSpacesAndInCamelCase}```
    - Try not to be too verbose in your feature names (no more than 3 words ideally)
    - You can now start coding!

### Pushing your changes to github and making a PR:

Once you've made changes and added a feature you are happy with, in the terminal:

- ```git add .```
- ```git commit -m "Your message about the changes here.. make sure to always have a message!"```
- ```git push```

After this, your changes should officially be on github. But you're not done yet. You have one more step. Which is to create a Pull Request. (Message me on discord about that, we can do an example of that together, I dont want to write that out right now).
