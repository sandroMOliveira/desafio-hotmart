# Generated by Django 2.1.5 on 2019-01-05 13:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Boletim',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ano', models.IntegerField(blank=True, null=True)),
                ('mes', models.TextField(blank=True, null=True)),
                ('rubrica', models.TextField(blank=True, null=True)),
                ('conduta', models.TextField(blank=True, null=True)),
                ('latitude', models.FloatField(blank=True, null=True)),
                ('longitude', models.FloatField(blank=True, null=True)),
                ('cidade', models.TextField(blank=True, null=True)),
                ('logradouro', models.TextField(blank=True, null=True)),
                ('numero_logradouro', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'boletins',
            },
        ),
        migrations.CreateModel(
            name='Delegacia',
            fields=[
                ('id_delegacia', models.IntegerField(primary_key=True, serialize=False)),
                ('nome_departamento', models.TextField(blank=True, null=True)),
                ('nome_seccional', models.TextField(blank=True, null=True)),
                ('delegacia', models.TextField(blank=True, null=True)),
                ('nome_seccional_circ', models.TextField(blank=True, null=True)),
                ('nome_delegacia_circ', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'delegacias',
            },
        ),
        migrations.AddField(
            model_name='boletim',
            name='id_delegacia',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='avaliacao.Delegacia'),
        ),
    ]
