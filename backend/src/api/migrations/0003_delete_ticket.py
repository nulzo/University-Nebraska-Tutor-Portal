# Generated by Django 4.2.4 on 2023-09-06 01:02

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0002_ticket_completed_ticket_started"),
    ]

    operations = [
        migrations.DeleteModel(
            name="Ticket",
        ),
    ]
