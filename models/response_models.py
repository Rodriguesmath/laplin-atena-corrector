"""
Response models for the Laplin Atena Corrector application.
"""

from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class CorrectionResponse(BaseModel):
    """Model for correction responses."""
    
    original_text: str
    corrected_text: str
    suggestions: List[str]
    confidence_score: Optional[float] = None
    language: str = "pt"

class ErrorResponse(BaseModel):
    """Model for error responses."""
    
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None