from django.contrib import admin

from backend.serializers import MessBillSerializer

# Register your models here.
from .models import *


admin.site.register(User)
# admin.site.register(Message)
admin.site.register(Attendance)
# admin.site.register(Expense)
admin.site.register(Menu)
admin.site.register(Bill)
admin.site.register(MessBill)
admin.site.register(PayingBill)


class expensesAdmin(admin.ModelAdmin):
    list_filter = ['date']


admin.site.register(Expense, expensesAdmin)
