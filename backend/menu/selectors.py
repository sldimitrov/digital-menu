from django.db.models import Prefetch, QuerySet

from .models import Category, MenuItem, Modifier


def get_categories_with_items(restaurant_slug: str) -> QuerySet[Category]:
    items_qs = (
        MenuItem.objects.filter(is_available=True)
        .prefetch_related(
            Prefetch(
                "modifiers",
                queryset=Modifier.objects.filter(is_active=True).order_by("name"),
            )
        )
        .order_by("sort_order", "name")
    )

    return (
        Category.objects.filter(restaurant_slug=restaurant_slug, is_active=True)
        .prefetch_related(Prefetch("items", queryset=items_qs))
        .order_by("sort_order", "name")
    )


def get_items_by_category(category_id: int) -> QuerySet[MenuItem]:
    return (
        MenuItem.objects.filter(category_id=category_id, is_available=True)
        .prefetch_related(
            Prefetch(
                "modifiers",
                queryset=Modifier.objects.filter(is_active=True).order_by("name"),
            )
        )
        .order_by("sort_order", "name")
    )
