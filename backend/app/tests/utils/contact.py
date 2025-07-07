from sqlmodel import Session

from app import crud
from app.models import Contact, ContactCreate
from app.tests.utils.user import create_random_user
from app.tests.utils.utils import random_lower_string


def create_random_contact(db: Session) -> Contact:
    user = create_random_user(db)
    owner_id = user.id
    assert owner_id is not None
    organisation = random_lower_string()
    description = random_lower_string()
    contact_in = ContactCreate(organisation=organisation, description=description)
    return crud.create_contact(session=db, contact_in=contact_in, owner_id=owner_id)
