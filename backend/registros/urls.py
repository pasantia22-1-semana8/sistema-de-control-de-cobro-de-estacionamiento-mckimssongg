from django.urls import path
from . import views
from django.db import router
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'registro_entrada', views.Registro_EntradaViewSet)
router.register(r'registro_pago', views.Registro_PagoViewSet)
urlpatterns = router.urls


urlpatterns += [
    path('registro_entrada', views.Registro_Entrada_ActivoViewSet.as_view()),
]
