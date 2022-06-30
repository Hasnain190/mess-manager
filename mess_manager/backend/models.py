from distutils.command.build_scripts import first_line_re
from operator import mod
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

# normal user
class User(AbstractUser):
    """add some more field to user model"""

    phone = models.CharField(max_length=20, blank=True, null=True)
    
    hostel = models.CharField(max_length=20, blank=True, null=True)
    room = models.CharField(max_length=20, blank=True, null=True)
   




class Attendance(models.Model):
    """
    Attendance model
    """


    status_choices = (
        ('present', 'present'), 
        ('absent', 'absent'),
        ('double', 'double'),
    )


    studant = models.ForeignKey('User', on_delete=models.CASCADE)
    date = models.DateField()
    first_time = models.CharField(max_length=20, choices=status_choices )
    second_time = models.CharField(max_length=20, choices=status_choices )
    def __str__(self):
        return self.studant.username + ' ' + self.date.strftime('%d/%m/%Y') 


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

    day = models.CharField(max_length=20, blank=True, null=True, choices=day_of_week_choices, unique=True)
    first_time = models.CharField(max_length=50, blank=True, null=True)
    second_time = models.CharField(max_length=50, blank=True, null=True)


    def __str__(self) -> str:
        return self.day + ' ' + self.first_time + ' ' + self.second_time



class Expense(models.Model):
    """For expenses for one day """
    date = models.DateField()
    total_attendances = models.IntegerField(blank=True,null=True, unique=True)
    expenenses_per_day = models.IntegerField(blank=True,null=True)
    expenenses_per_capita= models.IntegerField(blank=True,null=True)


    
    def __str__(self) -> str:
        return "Expenses per capita for the date "+ self.date + " is "+ self.expenenses_per_capita



class Bill(models.Model):
    """Mess bill for all the users in One Month"""

    def __init__(self, room, hostel):
        self.student.room = room
        self.student.hostel = hostel

            
            

        

    studant = models.ForeignKey("User",on_delete=models.CASCADE,related_name="studant")
    bill = models.IntegerField(blank=True,null= True)
    


