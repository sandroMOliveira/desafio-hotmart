from rest_framework import serializers
from avaliacao import models

class ListBoletim(serializers.ModelSerializer):

    class Meta:
        model = models.Boletins
        fields = '__all__'

    id_delegacia = serializers.SerializerMethodField()

    def get_id_delegacia(self, obj):
        delegacia = models.Delegacias.objects\
        .filter(id_delegacia=obj.id_delegacia).first()
        if delegacia:
            return ListDelegacia(delegacia).data
        return obj.id_delegacia

class Boletim(serializers.ModelSerializer):

    class Meta:
        model = models.Boletins
        fields = (
            'id_delegacia',
            'ano',
            'mes',
            'rubrica',
            'conduta',
            'latitude',
            'longitude',
            'cidade',
            'logradouro',
            'numero_logradouro',
        )

class ListDelegacia(serializers.ModelSerializer):

    class Meta:
        model = models.Delegacias
        fields = '__all__'