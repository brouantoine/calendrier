from datetime import date
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings

from .models import Client, Program
from .serializers import (
    ClientSerializer, CreateClientSerializer, ProgramSerializer,
    UserMiniSerializer, AdminClientListSerializer
)
from .permissions import IsAdmin, IsOwnerOrAdmin

User = get_user_model()

class MeViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    def list(self, request):
        user = request.user
        data = UserMiniSerializer(user).data
        data['full_name'] = user.get_full_name() or user.username
        today = date.today()
        data['programs_this_month'] = Program.objects.filter(
            client=user, date__year=today.year, date__month=today.month
        ).count()
        return Response(data)

class ClientAdminViewSet(viewsets.ViewSet):
    permission_classes = [IsAdmin]
    @action(detail=False, methods=['post'])
    def create_client(self, request):
        s = CreateClientSerializer(data=request.data); s.is_valid(raise_exception=True)
        d = s.validated_data
        if len(d['pin_code']) < getattr(settings, 'PIN_MIN_LENGTH', 4):
            return Response({'detail':'PIN trop court.'}, status=400)
        if User.objects.filter(username=d['username']).exists():
            return Response({'detail':"Nom d’utilisateur déjà pris."}, status=400)
        u = User.objects.create_user(
            username=d['username'], password=d['pin_code'],
            first_name=d.get('first_name',''), last_name=d.get('last_name','')
        )
        Client.objects.create(user=u, phone=d.get('phone',''))
        return Response({'id':u.id,'username':u.username}, status=201)

class ClientListAdminViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAdmin]
    serializer_class = AdminClientListSerializer
    queryset = User.objects.filter(client_profile__isnull=False).order_by('username')

class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.select_related('client').all()  # ✅
    serializer_class = ProgramSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        qs = super().get_queryset()
        u = self.request.user
        if not u.is_staff:
            qs = qs.filter(client=u)

        client = self.request.query_params.get('client')
        month  = self.request.query_params.get('month')  # YYYY-MM
        day    = self.request.query_params.get('day')    # YYYY-MM-DD

        if client and u.is_staff:
            try: qs = qs.filter(client__id=int(client))
            except ValueError: qs = qs.filter(client__username=client)

        if month:
            try:
                y, m = month.split('-'); qs = qs.filter(date__year=int(y), date__month=int(m))
            except ValueError:
                pass

        if day:
            qs = qs.filter(date=day)

        return qs.order_by('date','time','id')

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
