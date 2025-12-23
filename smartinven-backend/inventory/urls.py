from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet,
    ProductViewSet,
    product_count,
    low_stock,
    stock_chart
)

router = DefaultRouter()
router.register('products', ProductViewSet)
router.register('categories', CategoryViewSet)

urlpatterns = [
    path("products/count/", product_count, name="product-count"),
    path("products/low_stock/", low_stock, name="low-stock"),
    path("products/stock_chart/", stock_chart, name="stock-chart"),
]

urlpatterns += router.urls
