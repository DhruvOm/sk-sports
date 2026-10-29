from django.urls import path
from . import views

urlpatterns = [
    path('enquiries/', views.EnquiryCreateView.as_view()),
    path('trial-bookings/', views.TrialBookingCreateView.as_view()),
]