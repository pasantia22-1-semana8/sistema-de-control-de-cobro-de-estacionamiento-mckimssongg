# Generated by Django 4.0.4 on 2022-05-09 21:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Registro_Entrada',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('estado_de_salida', models.BooleanField(blank=True, default=False, null=True)),
                ('fecha_entrada', models.DateTimeField(auto_now_add=True)),
                ('fecha_salida', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Registro_Pago',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_pago', models.DateTimeField(auto_now_add=True)),
                ('is_active', models.BooleanField(default=True)),
                ('registro_entrada', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='registros.registro_entrada')),
            ],
        ),
    ]
