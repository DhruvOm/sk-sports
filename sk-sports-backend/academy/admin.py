from django.contrib import admin
from .models import Enquiry, TrialBooking


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'class_interest', 'batch', 'is_contacted', 'created_at')
    list_filter = ('is_contacted', 'class_interest', 'batch', 'created_at')
    search_fields = ('name', 'phone', 'email')
    list_editable = ('is_contacted',)      # tick "contacted" right from the list


@admin.register(TrialBooking)
class TrialBookingAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'age', 'phone', 'class_program', 'trial_date', 'trial_time', 'status')
    list_filter = ('status', 'class_program', 'trial_date')
    search_fields = ('student_name', 'parent_name', 'phone')
    list_editable = ('status',)
    date_hierarchy = 'trial_date'