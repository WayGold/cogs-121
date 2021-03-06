COGS 121 Team ZZZZ final deliverable
====================================

Team Members:
-------------

Wei Zeng -- backend server, create sql database, requester ticket submission, location functionalities, maps, filter.  
Qianzi Li -- some server functions, request board, request filter, request records, rating records, etc.  
Xinyi Jiao -- Front end design & implementation, css  
Siyu Zhou -- dropdown navigation bar, background periodic refresh, responsive jump, Registration validity judgment and logout.  

Source Files
------------

### HTML File

#### Requester Section

r_finished.html - front end for finished page, showing that the service is finished and let the user rate the volunteer and submit any necessary comments about that service  
r_record.html -  front end for showing request records  
r_request.html - front end for request page ticket submission  
waiting.html - front end for showing matching status  

#### Volunteer Section

v_record.html - front end for showing accepted requests  
v_task.html - front end for displaying requests to be accepted  
v_taskinfo.html - front end for the specific data of the disabled  
v_taskinfo1.html - front end for showing finishing status  

#### Other Pages

index.html - front end for introducing the main purpose of the website  
login.html - front end for volunteer/requester login or register  
rating_record.html - front end for showing the rating record  
report.html - front end for volunteer/requester to report any issue they have  

### Javascript Files

#### Requester Section

r_finished.js - star rating function for the requester  
r_record.js - appending user's request record  
r_request.js - ticket submission functionality  
waiting.js - requester waiting status processing and map  

#### Volunteer Section

v_record.js - appending user's accepted request  
v_task.js - appending requests to be accepted  
v_taskinfo.js - displaying the data that matches the specific userid  
v_taskinfo1.js - ticket acceptance and map  

#### Other Pages

login.js - login function and register function  
rating_record.js - displaying rating record  
key.js - store api key  
main.js - store current userid  
create_db.js - create sqlite  
database server.js - server backend code  
server.js - server backend code  

### CSS Files

#### Requester Section

r_finished.css - stylesheet for the user's information, star rating and text box for comments  
r_record.css - stylesheet for requester's record  
r_request.css - stylesheet for the request form  
r_waiting.css - stylesheet for three waiting states  

#### Volunteer Section

v_record.css - stylesheet for volunteer's record  
v_task.css - stylesheet for requests to be accepted  
v_taskinfo.css - stylesheet for specific information and images in the box  
v_taskinfo1.css - stylesheet for the map  

#### Other Pages

login.css - stylesheet for the login box for username and password  
main.css - stylesheet for the position and displaying the navigation bar  
rating_record.css - stylesheet for rating record  

Google Slide Link
-----------------

https://docs.google.com/presentation/d/1T_9Q9mQG6tSy4qrH_YnzBw2XsaaLTXPbJbcKt2XX4Wc/edit?usp=sharing

Final Demo Video Link
---------------------

https://youtu.be/jRYZ0QMpTa4
