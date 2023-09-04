from django.urls import path

import backend.src.portal.views as portal

urlpatterns = [path("", portal.landing_page, name="landing_page")]
