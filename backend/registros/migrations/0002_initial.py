# Generated by Django 4.0.4 on 2022-05-09 03:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('vehiculos', '0001_initial'),
        ('registros', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('estacionamiento', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='registro_entrada',
            name='a_cargo_de',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='registro_entrada',
            name='estacionamiento',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='estacionamiento.area'),
        ),
        migrations.AddField(
            model_name='registro_entrada',
            name='vehiculo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vehiculos.vehiculo'),
        ),
    ]
