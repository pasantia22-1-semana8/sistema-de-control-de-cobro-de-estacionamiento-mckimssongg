from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets, generics

from .serializers import Registro_EntradaSerializer, Registro_PagoSerializer
from .models import Registro_Entrada, Registro_Pago


class Registro_Entrada_ActivoViewSet(generics.ListAPIView):
    serializer_class = Registro_EntradaSerializer

    def get_queryset(self):
        estado = self.request.query_params.get('estado')
        print(estado)
        if estado == 'true':
            queryset = Registro_Entrada.objects.filter(estado_de_salida=True)
        if estado == 'false':
            queryset = Registro_Entrada.objects.filter(estado_de_salida=False)
        else:
            queryset = Registro_Entrada.objects.all()
        return queryset


class Registro_EntradaViewSet(viewsets.ModelViewSet):
    queryset = Registro_Entrada.objects.all()
    serializer_class = Registro_EntradaSerializer


class Registro_PagoViewSet(viewsets.ModelViewSet):
    queryset = Registro_Pago.objects.all()
    serializer_class = Registro_PagoSerializer
