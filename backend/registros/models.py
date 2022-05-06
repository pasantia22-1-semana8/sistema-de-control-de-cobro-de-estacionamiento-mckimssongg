from django.db import models
from users.models import User
from estacionamiento.models import Estacionamiento, Area
from vehiculos.models import Vehiculo
from datetime import timezone


def tiempo_estacionado_en_minutos(fecha_salida, fecha_entrada):
    '''
    Calcula el tiempo que el vehiculo estuvo estacionado en minutos
    '''
    tiempo_estacionado = (fecha_salida -
                          fecha_entrada).seconds / 60
    return tiempo_estacionado


class Registro_Entrada(models.Model):

    estacionamiento = models.ForeignKey(
        Area, on_delete=models.CASCADE)

    vehiculo = models.ForeignKey(
        Vehiculo, on_delete=models.CASCADE)

    a_cargo_de = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True)

    estado_de_salida = models.BooleanField(
        default=False, blank=True, null=True)

    fecha_entrada = models.DateTimeField(auto_now_add=True)

    fecha_salida = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.vehiculo.placa


class Registro_Pago(models.Model):
    registro_entrada = models.OneToOneField(
        Registro_Entrada, on_delete=models.CASCADE)
    fecha_pago = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.registro_entrada.vehiculo.placa
