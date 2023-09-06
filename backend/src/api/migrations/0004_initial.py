# Generated by Django 4.2.4 on 2023-09-06 01:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("api", "0003_delete_ticket"),
    ]

    operations = [
        migrations.CreateModel(
            name="Course",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("course_name", models.CharField(max_length=100)),
                ("course_id", models.CharField(max_length=25)),
                ("is_active", models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name="Professor",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("email", models.CharField(max_length=100)),
                ("is_active", models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name="Student",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("email", models.CharField(max_length=100)),
                ("courses", models.ManyToManyField(to="api.course")),
            ],
        ),
        migrations.CreateModel(
            name="Tutor",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("is_active", models.BooleanField(default=True)),
                ("is_working", models.BooleanField(default=False)),
                ("tutor_bio", models.TextField()),
                ("courses_tutoring", models.ManyToManyField(to="api.course")),
            ],
        ),
        migrations.CreateModel(
            name="Ticket",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("completed", models.BooleanField(default=False)),
                ("started", models.BooleanField(default=False)),
                ("issue_type", models.CharField(max_length=100)),
                ("start_time", models.DateTimeField()),
                ("end_time", models.DateTimeField()),
                ("was_successful", models.BooleanField(default=False)),
                ("description", models.CharField(max_length=255)),
                ("comments", models.CharField(max_length=255)),
                (
                    "course",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        to="api.course",
                    ),
                ),
                (
                    "professor",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        to="api.professor",
                    ),
                ),
                (
                    "student",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        to="api.student",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="course",
            name="professor",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT, to="api.professor"
            ),
        ),
    ]
