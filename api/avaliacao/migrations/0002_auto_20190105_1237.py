# Generated by Django 2.1.5 on 2019-01-05 14:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('avaliacao', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='boletim',
            name='id_delegacia',
        ),
        migrations.AddField(
            model_name='boletim',
            name='delegacia',
            field=models.ForeignKey(blank=True, db_column='id_delegacia', null=True, on_delete=django.db.models.deletion.CASCADE, to='avaliacao.Delegacia'),
        ),
    ]
