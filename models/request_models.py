"""
Request models for the Laplin Atena Corrector application.
"""

from pydantic import BaseModel
from typing import Optional, List

class CorrectionRequest(BaseModel):
    """Model for correction requests."""
    
    text: str
    language: Optional[str] = "pt"
    correction_type: Optional[str] = "grammar"

class FeedbackRequest(BaseModel):
    """Model for feedback requests."""
    
    original_text: str
    corrected_text: str
    user_rating: int  # 1-5 scale