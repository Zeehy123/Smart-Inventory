from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns=[

  path('register/', views.RegisterView.as_view() , name='register'),
  path('login/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
 path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
