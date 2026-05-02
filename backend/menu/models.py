from django.db import models

from restaurants.models import Restaurant


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(TimeStampedModel):
    # Temporary field used for migrating existing rows to Restaurant FK.
    # Will be removed in a follow-up migration.
    restaurant_slug = models.SlugField(max_length=64, db_index=True)
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name="categories",
        null=True,
        blank=True,
    )
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=120)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "name"]
        constraints = [
            models.UniqueConstraint(
                fields=["restaurant_slug", "slug"], name="uniq_category_restaurant_slug"
            )
        ]

    def __str__(self) -> str:
        return f"{self.restaurant_slug}: {self.name}"


class MenuItem(TimeStampedModel):
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name="menu_items",
        null=True,
        blank=True,
    )
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="items"
    )
    name = models.CharField(max_length=140)
    slug = models.SlugField(max_length=140)
    description = models.TextField(blank=True)
    price_cents = models.PositiveIntegerField()
    image_url = models.URLField(blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "name"]
        constraints = [
            models.UniqueConstraint(
                fields=["category", "slug"], name="uniq_menu_item_category_slug"
            ),
        ]

    def __str__(self) -> str:
        return self.name

    def clean(self):
        if self.category_id and self.restaurant_id:
            if self.category.restaurant_id != self.restaurant_id:
                from django.core.exceptions import ValidationError

                raise ValidationError(
                    {"restaurant": "Must match category.restaurant."}
                )

    def save(self, *args, **kwargs):
        if self.category_id and not self.restaurant_id:
            self.restaurant = self.category.restaurant
        return super().save(*args, **kwargs)


class Modifier(TimeStampedModel):
    # Temporary field used for migrating existing rows to Restaurant FK.
    # Will be removed in a follow-up migration.
    restaurant_slug = models.SlugField(max_length=64, db_index=True)
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name="modifiers",
        null=True,
        blank=True,
    )
    name = models.CharField(max_length=140)
    slug = models.SlugField(max_length=140)
    price_delta_cents = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    menu_items = models.ManyToManyField(
        MenuItem, related_name="modifiers", blank=True
    )

    class Meta:
        ordering = ["name"]
        constraints = [
            models.UniqueConstraint(
                fields=["restaurant_slug", "slug"], name="uniq_modifier_restaurant_slug"
            )
        ]

    def __str__(self) -> str:
        return f"{self.restaurant_slug}: {self.name}"
