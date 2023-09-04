from django.contrib import admin

from .models import Example


# create a class for the admin-model integration
class ExampleAdmin(admin.ModelAdmin):
    # add the fields of the model here
    list_display = ("title", "description", "completed")


# we will need to register the
# model class and the Admin model class
# using the register() method
# of admin.site class
admin.site.register(Example, ExampleAdmin)
