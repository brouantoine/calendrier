from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Client, Program

class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','first_name','last_name','is_staff']

class ClientSerializer(serializers.ModelSerializer):
    user = UserMiniSerializer(read_only=True)
    class Meta:
        model = Client
        fields = ['id','user','phone','created_at']

class CreateClientSerializer(serializers.Serializer):
    username   = serializers.CharField()
    first_name = serializers.CharField(allow_blank=True, required=False)
    last_name  = serializers.CharField(allow_blank=True, required=False)
    phone      = serializers.CharField(allow_blank=True, required=False)
    pin_code   = serializers.CharField(write_only=True)

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = [
            'id','client','date','time','title','type','platforms',
            'media_brief','caption','hashtags','notes',
            'created_by','created_at','updated_at'
        ]
        read_only_fields = ['created_by','created_at','updated_at']

# ✅ Liste clients pour l'admin (prend le phone via le profil lié)
class AdminClientListSerializer(serializers.ModelSerializer):
    phone = serializers.SerializerMethodField()
    class Meta:
        model  = User
        fields = ['id','username','first_name','last_name','phone']
    def get_phone(self, obj):
        prof = getattr(obj, 'client_profile', None)
        return getattr(prof, 'phone', '')
