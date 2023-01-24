from django.contrib import admin

# Register your models here.
from .models import *


admin.site.register(User)
# admin.site.register(Message)
admin.site.register(Attendance)
# admin.site.register(Expense)
admin.site.register(Menu)


class expensesAdmin(admin.ModelAdmin):
    list_filter = ['date']


admin.site.register(Expense, expensesAdmin)
