# Generated by Django 4.0.5 on 2023-07-26 18:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0018_rename_grocery_and_other_expenses_expense_expenses_expenses_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='expense',
            old_name='expenses_expenses',
            new_name='expenses_vegetables',
        ),
    ]