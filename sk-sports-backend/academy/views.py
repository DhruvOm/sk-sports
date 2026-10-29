from rest_framework import generics
from .models import Enquiry, TrialBooking
from .serializers import EnquirySerializer, TrialBookingSerializer


class EnquiryCreateView(generics.CreateAPIView):
    """POST /api/enquiries/  -> saves a new enquiry"""
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer


class TrialBookingCreateView(generics.CreateAPIView):
    """POST /api/trial-bookings/  -> saves a new trial booking"""
    queryset = TrialBooking.objects.all()
    serializer_class = TrialBookingSerializer