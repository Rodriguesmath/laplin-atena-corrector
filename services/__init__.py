"""
Services module for Laplin Atena Corrector.
"""

from .correction_service import CorrectionService
from .llm_service import LLMService

__all__ = [
    "CorrectionService",
    "LLMService"
]