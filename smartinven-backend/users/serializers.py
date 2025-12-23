from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
User=get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model=User
        fields=['first_name','last_name','username','email', 'role']


class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True,required=True, validators=[validate_password])
    confirm_password=serializers.CharField(write_only=True, required=True)

    class Meta:
        model=User
        fields=['first_name','last_name','username','email','password','confirm_password']

    def validate(self,attrs):
        if attrs['password'] !=attrs['confirm_password']:
            raise serializers.ValidationError({"password":"password do not match"})
        
        return attrs
    
    def create(self, validated_data):
        validated_data.pop("confirm_password")
        user=User.objects.create(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token=super().get_token(user)
        token["email"]=user.email
        return token
    
    def validate(self,attrs):
        username_field="email"
        attrs["username"]=attrs.get("email")
        return super().validate(attrs)