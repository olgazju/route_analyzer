# How to install enviroment on Windows:
 1. Install [Python 3.6 version](https://www.python.org/downloads/release/python-360/). 
Make sure that C:\Program Files (x86)\Python36-32; and C:\Program Files (x86)\Python36-32\Scripts; is part of your path.
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
