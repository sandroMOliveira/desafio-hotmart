from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters
from . import models, serializers, paginations

class BoletimView(generics.ListCreateAPIView, generics.UpdateAPIView):
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_fields = ('id_delegacia', 'mes', 'ano', 'cidade')
    search_fields = ('delegacia', 'mes', 'ano', 'rubrica',)
    ordering_fields = ('mes',)
    queryset = models.Boletins.objects.order_by('mes', 'id').all()
    pagination_class = paginations.StandartPagination

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return serializers.ListBoletim
        return serializers.Boletim
    
    def perform_create(self, serializer):
        boletim = models.Boletins.objects.order_by('-id').first()
        if boletim:
            serializer.validated_data.update(id=boletim.id + 1)
        else:
            serializer.validated_data.update(id=1)
        serializer.save()

class DelegaciaView(generics.ListAPIView):
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ('id_delegacia',)  
    search_fields = ('id_delegacia', 'nome_departamento', 'delegacia', 'nome_delegacia_circ',)
    ordering_fields = ('nome_departamento',)
    queryset = models.Delegacias.objects.all()
    serializer_class = serializers.ListDelegacia
