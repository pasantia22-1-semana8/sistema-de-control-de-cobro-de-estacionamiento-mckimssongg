# Generated by Django 4.0.4 on 2022-05-09 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registros', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='registro_entrada',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='registro_pago',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
