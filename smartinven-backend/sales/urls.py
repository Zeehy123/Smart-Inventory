from django.urls import path
from .views import SalesListCreateView,sales_summary,revenue_chart,top_products
from django.conf import settings
from django.conf.urls.static import static
urlpatterns=[
  path('sales/',SalesListCreateView.as_view() , name='sales'),
  path('sales/summary/',sales_summary),
  path('sales/revenue_chart/',revenue_chart),
  path('sales/top_products/',top_products),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
