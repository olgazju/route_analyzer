# Navigation routes analyzer application

Features:
1. Allow the user to select a route and draw the route point by point in the order of the timestamp (so the
route is not drawn at once). The points should be drawn chronologically in a delay of your choice.
2. After the user has drawn a line, allow him to see all routes that cross the line.
3. Add unit tests.

## How to set enviroment on Windows:
 1. Install [Python 3.6 version](https://www.python.org/downloads/release/python-360/). 
Make sure that C:\Program Files (x86)\Python36-32; and C:\Program Files (x86)\Python36-32\Scripts; is part of your PATH.

 2. Install vitrualenv to create individual environment
 
`pip install virtualenv`

 3. Create enviroment:
 

`mkdir C:\virtualenv`

`cd C:\virtualenv`

`virtualenv routes`

 4. Activate enviroment
 
`cd C:\virtualenv\routes\Scripts`

`activate`

 5. Clone repository
 
 `cd C:\`

 `git clone https://github.com/olgazju/route_analyzer.git`

 6. Install requirements
 
`cd route_analyzer`

`pip install -r requirements.txt`

7. Run server

`cd route_analyzer\analyzer`

`python manage.py runserver`

## How to run app (pure JS):

Open http://127.0.0.1:8000/map

## How to run app (Angular 6):

Open http://127.0.0.1:8000/

## How to run tests:

`cd route_analyzer\analyzer`

`python manage.py test routes`

## How to rebuild Angular app:

1. Install [Node.js](https://nodejs.org/en/)

2. Install Angular CLI

`npm install -g @angular/cli`

3. Make Builds

`cd route_analyzer\analyzer\app`

`npm install`

`ng build`

`cd route_analyzer\analyzer\`

`python manage.py collectstatic`
