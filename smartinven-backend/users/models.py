from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):

  ROLE_CHOICES=[
    ('admin', 'Admin'),
    ('staff', 'Staff'),

  ]
  first_name=models.CharField(max_length=250,unique=True)
  last_name=models.CharField(max_length=150,unique=True)
  username=models.CharField(max_length=11,unique=True)

  email=models.EmailField(unique=True)
  role=models.CharField(max_length=20,choices=ROLE_CHOICES,default='staff')

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['username']

  def __str__(self):
    return f"{self.username} ({self.role})"