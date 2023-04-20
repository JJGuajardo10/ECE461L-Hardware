# ECE461L-Hardware

Steps for Installing Dependancies
1. npm install to download all needed node modules

2. create a virtual environment to run the server code (ex. python -m venv env)

3. Enter the virtual environment and install the modules required for running the server code (just run python app.py or python3 app.py and pip install <package> for every package the system asks for you to install)

That's it for the installation of dependancies!

Steps to run Project:
1. Have two terminal windows open 
2. In one terminal, run "npm start", which will start the client 
3. In the other terminal, enter your virtual environment and run 'python app.py" or "python3 app.py"

Checkpoint 3 Notable Talking Points:
R3-1:
1. Scaling hardware resources is as easy as creating more hardware set classes and implementing the necessary front-end componenets to match the new HWset. Very easy to accomplish

2. The front-end components of the application are highly modularized, which will allow for easy and selective modifications as needed. Adding text and new visuals will resultingly be easily accomplishable.

3. Billing information can be incorporated into either the user information tab or the hardware details tab. space within the UI for each of these tabs for the billing information can easily be made, and the UI elements can be added with relative ease.

R3-3: 
1. Unit tests for necessary js and python components can be found in the test folder of this codebase. Details for how we run our regression tests can also be found in the test folder, within the regressionTest text file

R3-4:
1. had to excise subltly duplicated functionality, specifically due to merging branches between team members. Happened very infrequently but the refactoring was done after CP2.

2. Due to not meeting certain requirements for stakeholder evaluations during CP2, we worked towards augmenting the post_cp2 code base to fix those issues, namely the missing checkin/checkout functionality

3. Formalized unit and regression testing practices post_cp2, and refactored after incorporating these new tests to excise extraneous testing methods.
