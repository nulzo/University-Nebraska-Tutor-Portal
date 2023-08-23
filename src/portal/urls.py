from django.urls import path

import src.portal.views as portal

urlpatterns = [path("", portal.landing_page, name="landing_page")]
