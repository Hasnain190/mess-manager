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
    student = models.ForeignKey('User', on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.student.username + ' ' + self.date.strftime('%d/%m/%Y') + ' ' + self.time.strftime('%H:%M') + ' ' + str(self.status)


# mess menu
class Menu(models.Model):
    """
    Menu model
    """
    name = models.CharField(max_length=100)
    time = models.TimeField()



    def __str__(self):
        return self.name + ' for the time ' + self.time.strftime('%H:%M')


