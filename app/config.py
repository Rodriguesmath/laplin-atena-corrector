"""
Configuration settings for the Laplin Atena Corrector application.
"""

from pydantic import BaseSettings

class Settings(BaseSettings):
    """Application settings."""
    
    app_name: str = "Laplin Atena Corrector"
    debug: bool = False
    api_version: str = "v1"
    
    class Config:
        env_file = ".env"

settings = Settings()