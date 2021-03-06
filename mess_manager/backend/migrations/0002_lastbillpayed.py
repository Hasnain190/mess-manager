# Generated by Django 4.0.5 on 2022-07-05 23:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='LastBillPayed',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_bill_payed_date', models.DateField()),
                ('bill', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='last_bill_payed', to='backend.bill')),
                ('student', models.ForeignKey(default='Student', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
