"""
API endpoints for the Laplin Atena Corrector application.
"""

from fastapi import FastAPI
from typing import Dict, Any

app = FastAPI(title="Laplin Atena Corrector", version="1.0.0")

@app.get("/")
async def root() -> Dict[str, str]:
    """Root endpoint."""
    return {"message": "Welcome to Laplin Atena Corrector API"}

@app.get("/health")
async def health_check() -> Dict[str, str]:
    """Health check endpoint."""
    return {"status": "healthy"}