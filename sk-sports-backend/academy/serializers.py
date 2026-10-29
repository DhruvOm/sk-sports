from rest_framework import serializers
from .models import Enquiry, TrialBooking


class EnquirySerializer(serializers.ModelSerializer):
    # React uses "classId"; our model uses "class_interest"
    classId = serializers.ChoiceField(
        source='class_interest', choices=Enquiry._meta.get_field('class_interest').choices,
        required=False, allow_blank=True,
    )

    class Meta:
        model = Enquiry
        fields = ['id', 'name', 'phone', 'email', 'age', 'classId', 'batch', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

    def to_internal_value(self, data):
        # An empty age box in the form arrives as "" -> treat it as "no age"
        data = data.copy()
        if data.get('age') == '':
            data['age'] = None
        return super().to_internal_value(data)


class TrialBookingSerializer(serializers.ModelSerializer):
    # Map React's camelCase names to our model's field names
    studentName = serializers.CharField(source='student_name', max_length=100)
    parentName = serializers.CharField(source='parent_name', max_length=100, required=False, allow_blank=True)
    classId = serializers.ChoiceField(
        source='class_program', choices=TrialBooking._meta.get_field('class_program').choices
    )
    date = serializers.DateField(source='trial_date')
    time = serializers.TimeField(source='trial_time')

    class Meta:
        model = TrialBooking
        fields = ['id', 'studentName', 'age', 'parentName', 'phone', 'email',
                  'classId', 'date', 'time', 'consent', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate(self, attrs):
        # Rules that involve more than one field
        if not attrs.get('consent'):
            raise serializers.ValidationError({'consent': 'Please confirm to continue.'})
        if attrs['age'] < 18 and not attrs.get('parent_name'):
            raise serializers.ValidationError({'parentName': 'Parent / guardian name is required for students under 18.'})
        return attrs