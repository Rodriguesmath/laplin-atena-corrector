"""
Models module for Laplin Atena Corrector.
"""

from .request_models import CorrectionRequest, FeedbackRequest
from .response_models import CorrectionResponse, ErrorResponse

__all__ = [
    "CorrectionRequest",
    "FeedbackRequest", 
    "CorrectionResponse",
    "ErrorResponse"
]