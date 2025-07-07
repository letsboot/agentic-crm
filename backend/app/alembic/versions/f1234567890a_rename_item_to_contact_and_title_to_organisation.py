"""rename item to contact and title to organisation

Revision ID: f1234567890a
Revises: 1a31ce608336
Create Date: 2025-01-04 15:55:00.000000

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "f1234567890a"
down_revision = "1a31ce608336"
branch_labels = None
depends_on = None


def upgrade():
    # Rename the item table to contact
    op.rename_table("item", "contact")
    
    # Rename the title column to organisation
    op.alter_column("contact", "title", new_column_name="organisation")


def downgrade():
    # Rename the organisation column back to title
    op.alter_column("contact", "organisation", new_column_name="title")
    
    # Rename the contact table back to item
    op.rename_table("contact", "item")
