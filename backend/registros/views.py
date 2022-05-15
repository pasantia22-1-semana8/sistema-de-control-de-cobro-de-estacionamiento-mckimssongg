from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets, generics

from .serializers import *
from .models import *


class Cobro_MesViewSet(generics.ListAPIView):
    '''
    Para realizar el cobro de mes de un vehiculo
    si su tipo de residencia es de tipo residente
    '''
    queryset = Registro_Pago.objects.filter(
        is_active=True,
        registro_entrada__vehiculo__tipo_residencia__nombre='Residente',
        registro_entrada__is_active=True
    )

    serializer_class = Registro_PagoSerializer

    def get_queryset(self):
        placa = self.request.query_params.get('placa', None)
        if placa:
            queryset = self.queryset.filter(
                registro_entrada__vehiculo__placa=placa)
        else:
            queryset = self.queryset
        return queryset


class Registro_Entrada_D_ActivoViewSet(generics.ListAPIView):
    '''
    Retorna los registros de entrada que estan activos
    (no se han borrado)
    '''
    queryset = Registro_Entrada.objects.filter(is_active=True)
    serializer_class = Registro_EntradaSerializer


class Registro_Pago_ActivoViewSet(generics.ListAPIView):
    '''
    Para recuperar solo los registros de pago activos
    (que no han sido cancelados)
    '''
    queryset = Registro_Pago.objects.filter(
        is_active=True, registro_entrada__is_active=True, registro_entrada__vehiculo__tipo_residencia__nombre='Residente')
    serializer_class = Registro_PagoSerializer


class Registro_Entrada_ActivoViewSet(generics.ListAPIView):
    '''
    Para obtener los registros de entrada
    que ya se les dio una salida
    y los que aun no se les dio una salida
    '''
    serializer_class = Registro_EntradaSerializer

    def get_queryset(self):
        estado = self.request.query_params.get('estado')
        if estado == 'true':
            queryset = Registro_Entrada.objects.filter(estado_de_salida=True)
        elif estado == 'false':
            queryset = Registro_Entrada.objects.filter(estado_de_salida=False)
        else:
            queryset = Registro_Entrada.objects.all()
        return queryset


class Registro_EntradaKeysViewSet(viewsets.ModelViewSet):
    queryset = Registro_Entrada.objects.all()
    serializer_class = Registro_EntradaKeysSerializer

    def update(self, request, *args, **kwargs):
        registro = self.get_object()
        registro_data = request.data
        registro_serializer = Registro_EntradaSerializer(
            instance=registro, data=registro_data)
        if registro_serializer.is_valid():
            registro_serializer.save()
            return Response(registro_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(registro_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer_class.data)


class Registro_EntradaViewSet(viewsets.ModelViewSet):
    queryset = Registro_Entrada.objects.all()
    serializer_class = Registro_EntradaSerializer

    def destroy(self, request, *args, **kwargs):
        registro = self.get_object()
        registro.delete()

        return Response({"message": "El registro de entrada fue eliminado"}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        registro = self.get_object()
        registro_data = request.data
        registro_serializer = Registro_EntradaSerializer(
            instance=registro, data=registro_data)
        if registro_serializer.is_valid():
            registro_serializer.save()
            return Response(registro_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(registro_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer_class.data)


class Registro_PagoViewSet(viewsets.ModelViewSet):
    queryset = Registro_Pago.objects.all()
    serializer_class = Registro_PagoSerializer

    def destroy(self, request, *args, **kwargs):
        registro = self.get_object()
        registro.delete()

        return Response({"message": "El registro de pago fue eliminado"}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        registro = self.get_object()
        registro_data = request.data
        registro_serializer = Registro_PagoSerializer(
            instance=registro, data=registro_data)
        if registro_serializer.is_valid():
            registro_serializer.save()
            return Response(registro_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(registro_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer_class.data)
