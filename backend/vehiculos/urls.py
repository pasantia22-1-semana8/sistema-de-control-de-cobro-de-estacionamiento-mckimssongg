from django.urls import path
from . import views
from django.db import router
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'tipos', views.Tipo_ResidenciaViewSet)
router.register(r'vehiculos', views.VehiculoViewSet)

urlpatterns = router.urls
