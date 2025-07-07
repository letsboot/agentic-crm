import uuid

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.tests.utils.contact import create_random_contact


def test_create_contact(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {"organisation": "Foo Corp", "description": "Tech company"}
    response = client.post(
        f"{settings.API_V1_STR}/contacts/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["organisation"] == data["organisation"]
    assert content["description"] == data["description"]
    assert "id" in content
    assert "owner_id" in content


def test_read_contact(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    contact = create_random_contact(db)
    response = client.get(
        f"{settings.API_V1_STR}/contacts/{contact.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["organisation"] == contact.organisation
    assert content["description"] == contact.description
    assert content["id"] == str(contact.id)
    assert content["owner_id"] == str(contact.owner_id)


def test_read_contact_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/contacts/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Contact not found"


def test_read_contact_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    contact = create_random_contact(db)
    response = client.get(
        f"{settings.API_V1_STR}/contacts/{contact.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_read_contacts(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    create_random_contact(db)
    create_random_contact(db)
    response = client.get(
        f"{settings.API_V1_STR}/contacts/",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content["data"]) >= 2


def test_update_contact(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    contact = create_random_contact(db)
    data = {"organisation": "Updated Corp", "description": "Updated description"}
    response = client.put(
        f"{settings.API_V1_STR}/contacts/{contact.id}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["organisation"] == data["organisation"]
    assert content["description"] == data["description"]
    assert content["id"] == str(contact.id)
    assert content["owner_id"] == str(contact.owner_id)


def test_update_contact_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    data = {"organisation": "Updated Corp", "description": "Updated description"}
    response = client.put(
        f"{settings.API_V1_STR}/contacts/{uuid.uuid4()}",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Contact not found"


def test_update_contact_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    contact = create_random_contact(db)
    data = {"organisation": "Updated Corp", "description": "Updated description"}
    response = client.put(
        f"{settings.API_V1_STR}/contacts/{contact.id}",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"


def test_delete_contact(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    contact = create_random_contact(db)
    response = client.delete(
        f"{settings.API_V1_STR}/contacts/{contact.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["message"] == "Contact deleted successfully"


def test_delete_contact_not_found(
    client: TestClient, superuser_token_headers: dict[str, str]
) -> None:
    response = client.delete(
        f"{settings.API_V1_STR}/contacts/{uuid.uuid4()}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404
    content = response.json()
    assert content["detail"] == "Contact not found"


def test_delete_contact_not_enough_permissions(
    client: TestClient, normal_user_token_headers: dict[str, str], db: Session
) -> None:
    contact = create_random_contact(db)
    response = client.delete(
        f"{settings.API_V1_STR}/contacts/{contact.id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Not enough permissions"
