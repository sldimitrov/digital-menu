import pytest
from django.db import IntegrityError
from restaurants.models import Restaurant


@pytest.mark.django_db
def test_create_restaurant():
    restaurant = Restaurant.objects.create(
        name="Stefan Fast Food",
        slug="stefan-fast-food",
    )

    assert restaurant.name == "Stefan Fast Food"
    assert restaurant.slug == "stefan-fast-food"
    assert restaurant.is_active is True

@pytest.mark.django_db
def test_restaurant_str_returns_name():
    restaurant = Restaurant.objects.create(
        name="Stefan Fast Food",
        slug="stefan-fast-food",
    )

    assert str(restaurant) == "Stefan Fast Food"

@pytest.mark.django_db
def test_slug_must_be_unique():
    Restaurant.objects.create(
        name="Restaurant A",
        slug="restaurant",
    )

    with pytest.raises(IntegrityError):
        Restaurant.objects.create(
            name="Restaurant B",
            slug="restaurant",
        )

@pytest.mark.django_db
def test_restaurants_are_ordered_by_name():
    Restaurant.objects.create(
        name="Z Restaurant",
        slug="z-restaurant",
    )

    Restaurant.objects.create(
        name="A Restaurant",
        slug="a-restaurant",
    )

    restaurants = list(Restaurant.objects.all())

    assert restaurants[0].name == "A Restaurant"
    assert restaurants[1].name == "Z Restaurant"

@pytest.mark.django_db
def test_timestamps_are_set():
    restaurant = Restaurant.objects.create(
        name="Stefan Fast Food",
        slug="stefan-fast-food",
    )

    assert restaurant.created_at is not None
    assert restaurant.updated_at is not None
