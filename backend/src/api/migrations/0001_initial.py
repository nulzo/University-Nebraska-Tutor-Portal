# Generated by Django 4.2.6 on 2023-10-28 20:02

import django.db.models.deletion
import django.db.models.manager
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

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
                ("course_department", models.CharField(default="CSCI", max_length=10)),
                ("course_name", models.CharField(max_length=100)),
                ("course_id", models.IntegerField(max_length=10)),
                ("course_code", models.CharField(max_length=15, unique=True)),
            ],
            managers=[
                ("generic", django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name="Issues",
            fields=[
                (
                    "issue_id",
                    models.AutoField(editable=False, primary_key=True, serialize=False),
                ),
                ("problem_type", models.CharField(default="Problem", max_length=25)),
                (
                    "severity",
                    models.CharField(
                        choices=[
                            ("1", "1"),
                            ("2", "2"),
                            ("3", "3"),
                            ("4", "4"),
                            ("5", "5"),
                        ],
                        default="1",
                        max_length=1,
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "issue_types",
            },
        ),
        migrations.CreateModel(
            name="Messages",
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
                (
                    "message_type",
                    models.CharField(
                        choices=[
                            ("INF", "Informative"),
                            ("URG", "Urgent"),
                            ("GEN", "General"),
                        ],
                        default="INF",
                        max_length=3,
                    ),
                ),
                ("message_header", models.CharField(max_length=50)),
                ("message_body", models.TextField(max_length=1024)),
                ("from_date", models.DateTimeField(blank=True)),
                ("to_date", models.DateTimeField(blank=True)),
            ],
            options={
                "verbose_name_plural": "messages",
            },
        ),
        migrations.CreateModel(
            name="Professor",
            fields=[
                ("first_name", models.CharField(max_length=30)),
                ("last_name", models.CharField(max_length=50)),
                ("full_name", models.CharField(max_length=80)),
                ("email", models.CharField(max_length=50)),
                ("is_active", models.BooleanField(default=True)),
                (
                    "professor_id",
                    models.BigIntegerField(
                        max_length=30, primary_key=True, serialize=False, unique=True
                    ),
                ),
            ],
            managers=[
                ("professor", django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name="Section",
            fields=[
                ("modality", models.CharField(default="001", max_length=10)),
                (
                    "section_id",
                    models.BigIntegerField(
                        primary_key=True, serialize=False, unique=True
                    ),
                ),
                (
                    "course",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        to="api.course",
                    ),
                ),
                (
                    "professor",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        to="api.professor",
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "sections",
            },
            managers=[
                ("online", django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "student_nuid",
                    models.BigIntegerField(
                        default=1, primary_key=True, serialize=False, unique=True
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("is_active", models.BooleanField(default=False)),
                ("is_working", models.BooleanField(default=False)),
                ("is_tutor", models.BooleanField(default=False)),
                ("is_admin", models.BooleanField(default=False)),
                ("user_bio", models.TextField(blank=True, max_length=500)),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("MSOID", models.CharField(max_length=75, unique=True)),
                (
                    "courses_taken",
                    models.ManyToManyField(
                        blank=True,
                        null=True,
                        related_name="usertocoursetaken",
                        to="api.course",
                    ),
                ),
                (
                    "courses_tutoring",
                    models.ManyToManyField(
                        blank=True,
                        null=True,
                        related_name="usertocoursetutored",
                        to="api.course",
                    ),
                ),
            ],
            managers=[
                ("student", django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name="WorkingHours",
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
                ("mondayIn", models.TimeField(blank=True, null=True)),
                ("mondayOut", models.TimeField(blank=True, null=True)),
                ("tuesdayIn", models.TimeField(blank=True, null=True)),
                ("tuesdayOut", models.TimeField(blank=True, null=True)),
                ("wednesdayIn", models.TimeField(blank=True, null=True)),
                ("wednesdayOut", models.TimeField(blank=True, null=True)),
                ("thursdayIn", models.TimeField(blank=True, null=True)),
                ("thursdayOut", models.TimeField(blank=True, null=True)),
                ("fridayIn", models.TimeField(blank=True, null=True)),
                ("fridayOut", models.TimeField(blank=True, null=True)),
                ("saturdayIn", models.TimeField(blank=True, null=True)),
                ("saturdayOut", models.TimeField(blank=True, null=True)),
                ("sundayIn", models.TimeField(blank=True, null=True)),
                ("sundayOut", models.TimeField(blank=True, null=True)),
                (
                    "tutor",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT, to="api.user"
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "tutor_hours",
            },
            managers=[
                ("hours", django.db.models.manager.Manager()),
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
                ("name", models.CharField(max_length=50)),
                ("description", models.TextField(max_length=1024)),
                ("completed", models.BooleanField(default=False)),
                ("started", models.BooleanField(default=False)),
                ("start_time", models.DateTimeField(blank=True, null=True)),
                ("end_time", models.DateTimeField(blank=True, null=True)),
                ("tutor_comments", models.CharField(blank=True, max_length=255)),
                ("was_successful", models.BooleanField(default=False)),
                ("was_reopened", models.BooleanField(default=False)),
                (
                    "issue",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        to="api.issues",
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
                    "section",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        to="api.section",
                    ),
                ),
                (
                    "student",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="student_ticket",
                        to="api.user",
                    ),
                ),
                (
                    "tutor",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="tutor_ticket",
                        to="api.user",
                    ),
                ),
            ],
            managers=[
                ("ticket", django.db.models.manager.Manager()),
            ],
        ),
    ]
