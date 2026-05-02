from django.db import migrations


def backfill_restaurants(apps, schema_editor):
    Restaurant = apps.get_model("restaurants", "Restaurant")
    Category = apps.get_model("menu", "Category")
    MenuItem = apps.get_model("menu", "MenuItem")
    Modifier = apps.get_model("menu", "Modifier")

    slugs = set(
        Category.objects.exclude(restaurant_slug="").values_list("restaurant_slug", flat=True)
    ) | set(
        Modifier.objects.exclude(restaurant_slug="").values_list("restaurant_slug", flat=True)
    )

    for slug in sorted(slugs):
        Restaurant.objects.get_or_create(
            slug=slug,
            defaults={"name": slug.replace("-", " ").title(), "is_active": True},
        )

    for category in Category.objects.filter(restaurant__isnull=True).exclude(restaurant_slug=""):
        category.restaurant = Restaurant.objects.get(slug=category.restaurant_slug)
        category.save(update_fields=["restaurant"])

    for modifier in Modifier.objects.filter(restaurant__isnull=True).exclude(restaurant_slug=""):
        modifier.restaurant = Restaurant.objects.get(slug=modifier.restaurant_slug)
        modifier.save(update_fields=["restaurant"])

    for item in MenuItem.objects.filter(restaurant__isnull=True, category__isnull=False):
        item.restaurant = item.category.restaurant
        item.save(update_fields=["restaurant"])


class Migration(migrations.Migration):
    dependencies = [
        ("restaurants", "0001_initial"),
        ("menu", "0002_category_restaurant_menuitem_restaurant_and_more"),
    ]

    operations = [
        migrations.RunPython(backfill_restaurants, migrations.RunPython.noop),
    ]

