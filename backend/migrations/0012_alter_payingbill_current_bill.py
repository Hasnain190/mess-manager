# Generated by Django 4.0.5 on 2023-07-15 14:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0011_alter_bill_unique_together'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payingbill',
            name='current_bill',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.bill'),
        ),
    ]
