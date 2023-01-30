from distutils.command.build_scripts import first_line_re


from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib import admin
import decimal


class User(AbstractUser):
    """add some more field to user model"""

    phone = models.CharField(max_length=20, blank=True, null=True)

    hostel = models.CharField(max_length=20, blank=True, null=True)
    room = models.CharField(max_length=20, default=0)


class Attendance(models.Model):
    """
    Attendance model
    """

    status_choices = (
        ('present', 'present'),
        ('absent', 'absent'),
        ('double', 'double'),
    )

    student = models.ForeignKey('User', on_delete=models.CASCADE)
    date = models.DateField()
    first_time = models.CharField(max_length=20, choices=status_choices)
    second_time = models.CharField(max_length=20, choices=status_choices)

    def __str__(self):
        return self.student.username + ' ' + self.date.strftime('%d/%m/%Y')


# mess menu
class Menu(models.Model):
    """
    Menu model
    """

    day_of_week_choices = (
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
        ('Sunday', 'Sunday'),
    )

    day = models.CharField(max_length=20, blank=True,
                           null=True, choices=day_of_week_choices, unique=True)
    first_time = models.CharField(max_length=50, blank=True, null=True)
    second_time = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.day}' '{self.first_time }' ' {self.second_time}"


class Expense(models.Model):
    """For expenses for one day """
    date = models.DateField(unique=True)
    attendance_first_time = models.IntegerField(default=0)
    attendance_second_time = models.IntegerField(default=0)
    total_attendances = models.IntegerField(default=0)

    expenses_first_time = models.DecimalField(
        decimal_places=2, max_digits=20, default=0)
    expenses_second_time = models.DecimalField(
        decimal_places=2, max_digits=20, default=0)
    expenses_total = models.DecimalField(
        decimal_places=2, max_digits=20, default=0)


def __str__(self) -> str:
    return 'expenses for the date: '+self.date.isoformat()


class Bill(models.Model):
    """Mess bill for all the users in One Month"""

    student = models.ForeignKey(
        "User", on_delete=models.CASCADE, related_name="student")
    room = models.CharField(max_length=20, blank=True, default=0)

    dateMonth = models.DateField(unique=True)
    bill = models.DecimalField(
        decimal_places=2, max_digits=20, default=0)
    dues = models.DecimalField(max_digits=20,
                               decimal_places=2, default=0)
    total = models.DecimalField(max_digits=20,
                                decimal_places=2, default=0)

    class Meta:
        ordering = ["student"]

    def __str__(self) -> str:
        return f"bill of {self.student.username}  for month  {self.dateMonth} "


class MessBill(models.Model):

    """ A model that keeps all bills of students per month"""
    # to have many to many relationship with mess bill (total bill) . One mess bill can have many user's bill

    bills = models.ManyToManyField(Bill)
    # january , february , march etc
    dateMonth = models.DateField(unique=True)


class PayingBill(models.Model):
    """To calculate dues and add paying bills (yeh woh khana hai jisme bill ada kerne wale logon ka record rkha jata hai )"""
    current_bill = models.OneToOneField(Bill, on_delete=models.CASCADE)
    paying_bill = models.CharField(max_length=20, blank=True, null=True)
    student = models.ForeignKey(
        "User", on_delete=models.CASCADE)
    paying_date = models.DateField()
