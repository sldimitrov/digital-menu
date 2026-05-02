from typing import Any

from django.http import Http404
from django.http import HttpRequest

from restaurants.models import Restaurant

from .selectors import get_categories_with_items


def get_full_menu(restaurant_slug: str, request: HttpRequest | None = None) -> dict[str, Any]:
    restaurant = Restaurant.objects.filter(slug=restaurant_slug, is_active=True).first()
    if restaurant is None:
        raise Http404("Restaurant not found.")

    categories = get_categories_with_items(restaurant_slug)

    return {
        "restaurant_slug": restaurant.slug,
        "categories": [
            {
                "id": category.id,
                "name": category.name,
                "slug": category.slug,
                "sort_order": category.sort_order,
                "items": [
                    {
                        "id": item.id,
                        "name": item.name,
                        "slug": item.slug,
                        "description": item.description,
                        "price_cents": item.price_cents,
                        "image_url": (
                            request.build_absolute_uri(item.image.url)
                            if request is not None and item.image
                            else (item.image.url if item.image else None)
                        ),
                        "sort_order": item.sort_order,
                        "modifiers": [
                            {
                                "id": modifier.id,
                                "name": modifier.name,
                                "slug": modifier.slug,
                                "price_delta_cents": modifier.price_delta_cents,
                            }
                            for modifier in item.modifiers.all()
                        ],
                    }
                    for item in category.items.all()
                ],
            }
            for category in categories
        ],
    }

