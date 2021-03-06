from django.core.management.base import BaseCommand, CommandError
from routes.models import Route, Location
from django.conf import settings
import os
import sqlite3
import pandas as pd


class Command(BaseCommand):
    """
    Class Command for auto-importing of all CSV GEO-files from some folder to database
    Using in command line: python manage.py import YOUR_PATH_TO_CVS
    """
    help = 'Imports all CSV formatted route files in folder into database'

    def add_arguments(self, parser):
        parser.add_argument('folder', nargs='+', type=str)

    def handle(self, *args, **options):
        conn = sqlite3.connect(settings.DATABASES['default']['NAME'])
        for folder in options['folder']:
            try:
                # List all files in folder
                route_files = [f for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f))]

                for route_file in route_files:
                    rf = Route(name=route_file)
                    rf.save()

                    route_df = pd.read_csv(os.path.join(folder, route_file))

                    # standardize the table columns
                    route_df.columns = ['timestamp', 'longitude', 'latitude', 'accuracy', 'speed']
                    route_df['route_id'] = rf.id

                    # clean data from speed 0.0 and -1.0 and accuracy more then 200 meters
                    # !!! part of data came with timestamp in milliseconds, part in seconds !!!
                    route_df = route_df[(route_df["speed"] > 0) & (route_df["accuracy"] <= 200)]

                    route_df.to_sql('routes_location', conn, if_exists='append', index=False)

                    route_df

            except Exception as e:
                raise CommandError('Error importing data', e)

            self.stdout.write(self.style.SUCCESS('Successfully imported data from folder: %s' % folder))
