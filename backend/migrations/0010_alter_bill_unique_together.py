# Generated by Django 4.0.5 on 2023-07-15 13:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_alter_bill_unique_together'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='bill',
            unique_together=set(),
        ),
    ]