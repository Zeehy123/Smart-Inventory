from django.shortcuts import render
from rest_framework import viewsets, permissions,filters
from rest_framework.decorators import action,api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product,Category
from .serializers import ProductSerializer,CategorySerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import generics
from django.db.models import F,Sum

@method_decorator(csrf_exempt, name='dispatch')
class CategoryViewSet(viewsets.ModelViewSet):
  queryset=Category.objects.all()
  serializer_class=CategorySerializer
  authentication_classes = [JWTAuthentication] 
  permission_classes=[permissions.IsAuthenticated]


class ProductViewSet(viewsets.ModelViewSet):
  queryset=Product.objects.all().order_by('-created_at')
  serializer_class=ProductSerializer
  authentication_classes = [JWTAuthentication] 
  permission_classes=[permissions.IsAuthenticated]

  filter_backends=[
    filters.SearchFilter,
    DjangoFilterBackend,
    filters.OrderingFilter,
  ]

  #search fields
  search_fields=['name','sku']

  #filter 
  filterset_fields=['category']

  #sort fields

  ordering_fields=['name','quantity','selling_price','created_at']



 

@api_view(['GET'])
def product_count(request):
    count=Product.objects.count()
    return Response({"count":count})

@api_view(['GET'])
def low_stock(request):
    count = Product.objects.filter(quantity__lte=F('reorder_level')).count()
    return Response({"count": count})

@api_view(['GET'])
def stock_chart(request):
    data = (
        Product.objects.values("name")
        .annotate(total_stock=Sum("quantity"))
        .order_by("name")
    )

    return Response(list(data))