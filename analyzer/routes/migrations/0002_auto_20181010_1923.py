# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-10-10 16:23
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('routes', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='location',
            old_name='longtitude',
            new_name='longitude',
        ),
    ]
