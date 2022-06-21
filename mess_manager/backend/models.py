from distutils.command.build_scripts import first_line_re
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

# normal user
class User(AbstractUser):
    """add some more field to user model"""

    phone = models.CharField(max_length=20, blank=True, null=True)
    
    hostel = models.CharField(max_length=20, blank=True, null=True)
    room = models.CharField(max_length=20, blank=True, null=True)
   


# class Message(models.Model):
#     """
#     Message model
#     """
#     message = models.TextField()
#     date = models.DateTimeField(auto_now_add=True)
#     user = models.ForeignKey('User', on_delete=models.CASCADE)

#     def __str__(self):
#         return self.message



class Attendance(models.Model):
    """
    Attendance model
    """

    # time_choices = (
    #     ('first_time', 'first_time'),
    #     ('second_time', 'second_time'),
        
    # )

    status_choices = (
        ('present', 'present'), 
        ('absent', 'absent'),
        ('double', 'double'),
    )


    student = models.ForeignKey('User', on_delete=models.CASCADE)
    date = models.DateField(unique=True)
    # time = models.CharField(max_length=20, choices=time_choices, unique=True)
    first_time = models.CharField(max_length=20, choices=status_choices ,unique=True, default='present')
    second_time = models.CharField(max_length=20, choices=status_choices ,unique=True, default='present')

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

    day = models.CharField(max_length=20, blank=True, null=True, choices=day_of_week_choices, unique=True)
    first_time = models.CharField(max_length=20, blank=True, null=True)
    second_time = models.CharField(max_length=20, blank=True, null=True)


    def __str__(self) -> str:
        return self.day + ' ' + self.first_time + ' ' + self.second_time




    


