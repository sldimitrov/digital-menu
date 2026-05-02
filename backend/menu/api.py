from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView

from .services import get_full_menu


class ModifierSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    slug = serializers.SlugField()
    price_delta_cents = serializers.IntegerField()


class MenuItemSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    slug = serializers.SlugField()
    description = serializers.CharField(allow_blank=True)
    price_cents = serializers.IntegerField()
    image_url = serializers.URLField(allow_blank=True)
    sort_order = serializers.IntegerField()
    modifiers = ModifierSerializer(many=True)


class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    slug = serializers.SlugField()
    sort_order = serializers.IntegerField()
    items = MenuItemSerializer(many=True)


class FullMenuSerializer(serializers.Serializer):
    restaurant_slug = serializers.SlugField()
    categories = CategorySerializer(many=True)


class FullMenuView(APIView):
    authentication_classes: list = []
    permission_classes: list = []

    def get(self, request, restaurant_slug: str):
        payload = get_full_menu(restaurant_slug)
        serializer = FullMenuSerializer(payload)
        return Response(serializer.data)

