# Assigment - Navigation routes analyzer application

Create a client interface for your application.

The client has to include a map, for this you can use a map provider of your choice.

Enable the user to paint a line on the map, and add buttons and user input elements where needed.

Features:
1. Allow the user to select a route and draw the route point by point in the order of the timestamp (so the
route is not drawn at once). The points should be drawn chronologically in a delay of your choice.
2. After the user has drawn a line, allow him to see all routes that cross the line.
3. Add unit tests.

● If more than one route is presented, use a different color for each route.

● Please send clean and documented code.

● Use Django 1.11 in your project.

● you can use a client framework of your choice

## How to install enviroment on Windows:
 1. Install [Python 3.6 version](https://www.python.org/downloads/release/python-360/). 
Make sure that C:\Program Files (x86)\Python36-32; and C:\Program Files (x86)\Python36-32\Scripts; is part of your PATH.

 2. Install vitrualenv to create individual environment
 
`pip install virtualenv`

 3. Create enviroment:
 
cd YOUR_FOLDER_FOR_ENVIROMENTS

virtualenv YOUR_ENVIROMENT

`cd C:\virtualenv`

`virtualenv routes`

 4. Activate enviroment
 
`cd C:\virtualenv\routes\Scripts`

`activate`

 5. Install requirements
 
`cd route_analyzer`

`pip install -r requirements.txt`

6. Run server

`cd route_analyzer\analyzer`

`python manage.py runserver`

7. Open http://127.0.0.1:8000/
