How to install enviroment on Windows:

1. Install Python 2.7 version (https://www.python.org/download/releases/2.7). 
Make sure that C:\Python27; and C:\Python27\Scripts; is part of your path.

2. Install vitrualenv to create individual environment
pip install virtualenv

3. Create enviroment with Python 2.7 inside:
cd YOUR_FOLDER_FOR_ENVIROMENTS
virtualenv -p PATH_TO_PYTHON2.7_EXE YOUR_ENVIROMENT

cd C:\virtualenv
virtualenv -p C:\Python27\python2.exe routes

4. Activate enviroment
cd C:\virtualenv\routes\Scripts
activate

5. Install Django 1.11 version
pip install Django==1.11

6. Install pandas
pip install pandas
