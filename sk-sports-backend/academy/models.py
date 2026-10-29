from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.db import models

# Must match the class ids in the React app (src/data/classes.js)
CLASS_CHOICES = [
    ('little-dragons', 'Little Dragons (4–7)'),
    ('junior-warriors', 'Junior Warriors (8–12)'),
    ('teens', 'Teens Program (13–17)'),
    ('adults', 'Adults Program (18+)'),
    ('competition', 'Competition Team'),
]

BATCH_CHOICES = [('Morning', 'Morning'), ('Evening', 'Evening')]

# Indian mobile: optional +91, then 10 digits starting with 6-9
phone_validator = RegexValidator(
    regex=r'^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$',
    message='Enter a valid 10-digit Indian mobile number.',
)


class Enquiry(models.Model):
    """Saved from the Contact / Home page enquiry form."""
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, validators=[phone_validator])
    email = models.EmailField(blank=True)
    age = models.PositiveSmallIntegerField(
        null=True, blank=True, validators=[MinValueValidator(3), MaxValueValidator(80)]
    )
    class_interest = models.CharField(max_length=30, choices=CLASS_CHOICES, blank=True)
    batch = models.CharField(max_length=10, choices=BATCH_CHOICES, default='Evening')
    message = models.TextField(blank=True)
    is_contacted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']          # newest first
        verbose_name_plural = 'Enquiries'

    def __str__(self):
        return f'{self.name} ({self.phone})'


class TrialBooking(models.Model):
    """Saved from the Book Free Trial page."""
    STATUS_CHOICES = [
        ('new', 'New'),
        ('confirmed', 'Confirmed'),
        ('attended', 'Attended'),
        ('no_show', 'No show'),
        ('cancelled', 'Cancelled'),
    ]

    student_name = models.CharField(max_length=100)
    age = models.PositiveSmallIntegerField(validators=[MinValueValidator(4), MaxValueValidator(80)])
    parent_name = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=20, validators=[phone_validator])
    email = models.EmailField(blank=True)
    class_program = models.CharField(max_length=30, choices=CLASS_CHOICES)
    trial_date = models.DateField()
    trial_time = models.TimeField()
    consent = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    notes = models.TextField(blank=True, help_text='Internal notes (not shown to the customer)')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['trial_date', 'trial_time']

    def __str__(self):
        return f'{self.student_name} – {self.trial_date} {self.trial_time:%I:%M %p}'