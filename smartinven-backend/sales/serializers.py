from rest_framework import serializers
from .models import Sales

class SalesSerializer(serializers.ModelSerializer):
  product_name=serializers.ReadOnlyField(source="product.name")
  total_amount=serializers.ReadOnlyField()
  class Meta:
      model= Sales
      fields="__all__"