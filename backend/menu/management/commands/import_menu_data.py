from django.core.management.base import BaseCommand
from django.utils.text import slugify

from restaurants.models import Restaurant
from menu.models import Category, MenuItem

DATA = {
    "restaurant": {
        "name": "Burzo Hranene Stefan",
        "slug": "burzo-hranene",
    },
    "categories": [
        {
            "name": "Salads",
            "slug": "salads",
            "sort_order": 1,
            "items": [
                {
                    "name": "Caesar Salad",
                    "price_cents": 1290,
                    "description": "Classic Caesar with chicken",
                },
                {
                    "name": "Greek Salad",
                    "price_cents": 1190,
                },
            ],
        },
        {
            "name": "Drinks",
            "slug": "drinks",
            "items": [
                {
                    "name": "Coca Cola",
                    "price_cents": 450,
                }
            ],
        },
    ],
}

class Command(BaseCommand):
    help = "Imports initial menu data into the database"

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("Starting import..."))

        self.import_restaurant()
        self.import_categories()
        self.import_menu_items()

        self.stdout.write(self.style.SUCCESS("Import completed."))

    def import_restaurant(self):
        data = DATA["restaurant"]

        restaurant, created = Restaurant.objects.get_or_create(
            slug=data["slug"],
            defaults={"name": data["name"]},
        )

        self.restaurant = restaurant

        self.stdout.write(f"Restaurant: {restaurant.name}")

    def import_categories(self):
        for cat_data in DATA["categories"]:
            category, created = Category.objects.get_or_create(
                restaurant_slug=self.restaurant.slug,
                slug=cat_data["slug"],
                defaults={
                    "restaurant": self.restaurant,
                    "name": cat_data["name"],
                    "sort_order": cat_data.get("sort_order", 0),
                },
            )

            # ensure FK is filled (important for migration state)
            if not category.restaurant_id:
                category.restaurant = self.restaurant
                category.save()

            cat_data["instance"] = category

    def import_menu_items(self):
        for cat_data in DATA["categories"]:
            category = Category.objects.get(
                restaurant_slug=self.restaurant.slug,
                slug=cat_data["slug"],
            )

            for item in cat_data.get("items", []):
                slug = slugify(item["name"])

                menu_item, created = MenuItem.objects.get_or_create(
                    category=category,
                    slug=slug,
                    defaults={
                        "restaurant": self.restaurant,
                        "name": item["name"],
                        "price_cents": item["price_cents"],
                        "description": item.get("description", ""),
                    },
                )

                if not menu_item.restaurant_id:
                    menu_item.restaurant = self.restaurant
                    menu_item.save()

            self.stdout.write(f"Imported items for {category.name}")
