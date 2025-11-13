from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ClientAdminViewSet, ProgramViewSet, MeViewSet, ClientListAdminViewSet

router = DefaultRouter()
router.register(r'programs', ProgramViewSet, basename='program')
router.register(r'me', MeViewSet, basename='me')
router.register(r'clients', ClientListAdminViewSet, basename='clients')

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin-actions/create-client/', ClientAdminViewSet.as_view({'post': 'create_client'})),
    path('', include(router.urls)),
]
