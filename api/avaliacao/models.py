from django.db import models

class Boletins(models.Model):
    id = models.IntegerField(primary_key=True)
    id_delegacia = models.IntegerField(blank=True, null=True)
    ano = models.IntegerField(blank=True, null=True)
    mes = models.IntegerField(blank=True, null=True)
    rubrica = models.CharField(max_length=100, blank=True, null=True)
    conduta = models.CharField(max_length=50, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    cidade = models.CharField(max_length=50, blank=True, null=True)
    logradouro = models.CharField(max_length=100, blank=True, null=True)
    numero_logradouro = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'boletins'


class Delegacias(models.Model):
    id_delegacia = models.IntegerField(primary_key=True)
    nome_departamento = models.CharField(max_length=40, blank=True, null=True)
    nome_seccional = models.CharField(max_length=50, blank=True, null=True)
    delegacia = models.CharField(max_length=30, blank=True, null=True)
    nome_seccional_circ = models.CharField(max_length=30, blank=True, null=True)
    nome_delegacia_circ = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'delegacias'
