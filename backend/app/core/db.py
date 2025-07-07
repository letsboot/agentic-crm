from sqlmodel import Session, create_engine, select

from app import crud
from app.core.config import settings
from app.models import User, UserCreate, Contact, ContactCreate

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))


# make sure all SQLModel models are imported (app.models) before initializing DB
# otherwise, SQLModel might fail to initialize relationships properly
# for more details: https://github.com/fastapi/full-stack-fastapi-template/issues/28


def init_db(session: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next lines
    # from sqlmodel import SQLModel

    # This works because the models are already imported and registered from app.models
    # SQLModel.metadata.create_all(engine)

    user = session.exec(
        select(User).where(User.email == settings.FIRST_SUPERUSER)
    ).first()
    if not user:
        user_in = UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        user = crud.create_user(session=session, user_create=user_in)

    # Seed test data only in development mode
    if settings.ENVIRONMENT == "local":
        # Create test users
        test_users = [
            {"email": "alice@example.com", "password": "password123", "full_name": "Alice Example"},
            {"email": "bob@example.com", "password": "password123", "full_name": "Bob Example"},
        ]
        for u in test_users:
            if not session.exec(select(User).where(User.email == u["email"])).first():
                user_in = UserCreate(email=u["email"], password=u["password"], full_name=u["full_name"])
                crud.create_user(session=session, user_create=user_in)

        # Create test contacts for the superuser
        superuser = session.exec(select(User).where(User.email == settings.FIRST_SUPERUSER)).first()
        if superuser:
            test_contacts = [
                {
                    "organisation": "letsboot.ch",
                    "description": "letsboot.ch offers hands-on courses for software developers by experienced experts. Topics include Kubernetes, DevOps, Agentic Software Engineering, Security, GitLab CI/CD, Spring Boot, React, TypeScript, and more in Basel, Zurich."
                },
                {
                    "organisation": "OpenAI",
                    "description": "OpenAI is an AI research and deployment company focused on developing artificial general intelligence (AGI) that benefits all of humanity. Known for GPT models, ChatGPT, and DALL-E."
                },
                {
                    "organisation": "Anthropic",
                    "description": "Anthropic is an AI safety company focused on developing safe, beneficial, and understandable AI systems. They are the creators of Claude, a helpful AI assistant."
                },
                {
                    "organisation": "Hugging Face",
                    "description": "Hugging Face is a platform for machine learning and AI collaboration. They provide tools, models, and datasets for the AI community, including the popular Transformers library."
                },
                {
                    "organisation": "Google DeepMind",
                    "description": "Google DeepMind is a leading AI research lab that combines Google's AI expertise with DeepMind's research capabilities to advance artificial intelligence and solve complex problems."
                }
            ]
            for c in test_contacts:
                if not session.exec(select(Contact).where(Contact.organisation == c["organisation"]).where(Contact.owner_id == superuser.id)).first():
                    contact_in = ContactCreate(organisation=c["organisation"], description=c["description"])
                    crud.create_contact(session=session, contact_in=contact_in, owner_id=superuser.id)
