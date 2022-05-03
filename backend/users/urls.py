from django.urls import path
from . import views
from django.db import router
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'roles', views.RolesViewSet)
urlpatterns = router.urls


urlpatterns += [
    path('login', views.LoginView.as_view(), name='login'),
]
