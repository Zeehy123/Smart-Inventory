from rest_framework import serializers
from .models import Product, Category


class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model=Category
    fields="__all__"

class ProductSerializer(serializers.ModelSerializer):

    # Return category name in responses
    category_name = serializers.ReadOnlyField(source="category.name")
    status=serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "sku",
            "category",          
            "category_name",     
            "quantity",
            "reorder_level",
            "cost_price",
            "selling_price",
            "status"
        ]
    def get_status(self, obj):
        if obj.quantity == 0:
            return "Out of Stock"
        if obj.quantity <= obj.reorder_level:
            return "Low Stock"
        return "In Stock"
    # def create(self, validated_data):
    #     category_name = validated_data.pop("category")
    #     category, _ = Category.objects.get_or_create(name=category_name)
    #     validated_data["category"] = category
    #     return Product.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     if "category" in validated_data:
    #         category_name = validated_data.pop("category")
    #         category, _ = Category.objects.get_or_create(name=category_name)
    #         instance.category = category

    #     return super().update(instance, validated_data)