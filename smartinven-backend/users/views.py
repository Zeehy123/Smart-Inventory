from django.shortcuts import render
from rest_framework import generics,permissions
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer,CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# Create your views here.

User=get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
  queryset=User.objects.all()
  serializer_class=RegisterSerializer
  permission_classes=[permissions.AllowAny]
  aiuthentication_classes=[]