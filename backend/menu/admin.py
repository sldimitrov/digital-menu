from django.contrib import admin

from .models import Category, MenuItem, Modifier


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("restaurant", "name", "slug", "sort_order", "is_active")
    list_filter = ("restaurant", "is_active")
    search_fields = ("name", "slug", "restaurant__slug", "restaurant__name")
    ordering = ("restaurant", "sort_order", "name")

    prepopulated_fields = {
        "slug": ("name",)
    }


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "restaurant",
        "category",
        "price_cents",
        "sort_order",
        "is_available",
    )
    list_filter = ("is_available", "restaurant")
    search_fields = ("name", "slug", "category__name", "restaurant__slug")
    ordering = ("restaurant", "category", "sort_order", "name")

    prepopulated_fields = {
        "slug": ("name",)
    }

@admin.register(Modifier)
class ModifierAdmin(admin.ModelAdmin):
    list_display = ("restaurant", "name", "slug", "price_delta_cents", "is_active")
    list_filter = ("restaurant", "is_active")
    search_fields = ("name", "slug", "restaurant__slug", "restaurant__name")
