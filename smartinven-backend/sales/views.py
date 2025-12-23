from django.shortcuts import render
from rest_framework import generics
from .serializers import SalesSerializer
from .models import Sales
from django.db.models import F,Sum
from rest_framework.response import Response

from rest_framework.decorators import api_view
# Create your views here.


class SalesListCreateView(generics.ListCreateAPIView):
  queryset=Sales.objects.all().order_by("-created_at")
  serializer_class=SalesSerializer


@api_view(['GET'])
def sales_summary(request):
      total_revenue=Sales.objects.aggregate(
          total=Sum('total_amount')

      )['total'] or 0

      profit_query=Sales.objects.annotate(
        profit=(F('unit_price')-F('product__cost_price'))*F('quantity')
      ).aggregate(
        total_profit=Sum('profit')
      )

      total_profit=profit_query['total_profit'] or 0

      return Response({
          "total_revenue":total_revenue,
          "total_profit":total_profit
      })

@api_view(['GET'])
def revenue_chart(request):
  data=(
    Sales.objects.values('sales_date')
    .annotate(total=Sum('total_amount'))
    .order_by('sales_date')
  )
  return Response(data)

@api_view(['GET'])
def top_products(request):
  data=(
    Sales.objects.values('product__name')
    .annotate(total_sold=Sum('quantity'))
    .order_by('-total_sold')[:5]
  )
  return Response(data)