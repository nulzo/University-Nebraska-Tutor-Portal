# Generated by Django 4.2.6 on 2023-10-18 04:21

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="professor",
            name="sections",
        ),
        migrations.RemoveField(
            model_name="section",
            name="section_number",
        ),
    ]
