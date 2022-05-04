from rest_framework.serializers import ModelSerializer
from .models import Registro_Entrada, Registro_Pago, tiempo_estacionado_en_minutos


class Registro_EntradaSerializer(ModelSerializer):
    class Meta:
        model = Registro_Entrada
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['vehiculo'] = instance.vehiculo.placa
        representation['estacionamiento'] = instance.estacionamiento.nombre
        representation['a_cargo_de'] = instance.a_cargo_de.username
        return representation


class Registro_PagoSerializer(ModelSerializer):
    class Meta:
        model = Registro_Pago
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['registro_entrada'] = Registro_EntradaSerializer(
            instance.registro_entrada).data
        data['monto'] = round(float(tiempo_estacionado_en_minutos(
            instance.registro_entrada.fecha_salida, instance.registro_entrada.fecha_entrada)) * float(instance.registro_entrada.vehiculo.tipo_residencia.tarifa), 2)

        return data
