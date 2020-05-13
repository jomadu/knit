from rest_framework import serializers
from .models import Image

class ImageSerializer(serializers.HyperlinkedModelSerializer):    
    owner = serializers.ReadOnlyField(source='owner.username')
    url = serializers.HyperlinkedRelatedField(read_only=True, view_name='image-detail')
    class Meta:
        model = Image
        fields = ['url', 'id', 'created', 'title', 'description', 'owner']
