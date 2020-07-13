from rest_framework import serializers
from .models import Report

class ReportSerializer(serializers.ModelSerializer):    
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Report
        fields = ['id', 'owner', 'date_created', 'title', 'description']
