# Generated by Django 4.2.4 on 2023-09-06 01:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0005_remove_student_courses"),
    ]

    operations = [
        migrations.AddField(
            model_name="ticket",
            name="tutor",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.PROTECT, to="api.tutor"
            ),
        ),
        migrations.AlterField(
            model_name="ticket",
            name="end_time",
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name="ticket",
            name="start_time",
            field=models.DateTimeField(null=True),
        ),
    ]
