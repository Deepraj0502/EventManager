from django.contrib import admin
from django.urls import path,include
from connection import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.index,name="homepage"),
    path('reg',views.reg,name="reg"),
    path('getmail',views.getmail,name="getmail"),
    path('addevent',views.addevent,name="addevent"),
    path('getglobalevents',views.getglobalevents,name="getglobalevents"),
    path('getyourevents',views.getyourevents,name="getyourevents"),
    path('getlikedevents',views.getlikedevents,name="getlikedevents"),
    path('addlike',views.addlike,name="addlike"),
    path('removelike',views.removelike,name="removelike"),
]