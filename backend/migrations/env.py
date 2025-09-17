import os
import sys
from logging.config import fileConfig
from pathlib import Path
from sqlalchemy import engine_from_config, pool
from alembic import context

# Add project root to sys.path for imports
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

# Our project imports
from dotenv import load_dotenv
load_dotenv()  # Load .env for DATABASE_URL

from backend.database import Base  # Our declarative base
from backend.models import *  # Import models to register tables

# Alembic config
config = context.config

# Interpret .ini config or override
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Add our DB URL to config
config.set_main_option("sqlalchemy.url", os.getenv("DATABASE_URL", "sqlite:///./weather.db"))

target_metadata = Base.metadata  # Use our models' metadata

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,  # Already here
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, 
            insert_null=True,
            target_metadata=target_metadata  # FIXED: Added this line—key for autogenerate/online
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()