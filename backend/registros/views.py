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
