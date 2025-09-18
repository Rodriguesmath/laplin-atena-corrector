"""
JSON utility functions for the Laplin Atena Corrector application.
"""

import json
from typing import Dict, Any, Optional, Union
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class JsonUtils:
    """Utility class for JSON operations."""
    
    @staticmethod
    def serialize_datetime(obj: Any) -> str:
        """
        JSON serializer for datetime objects.
        
        Args:
            obj: Object to serialize
            
        Returns:
            JSON string representation
        """
        if isinstance(obj, datetime):
            return obj.isoformat()
        raise TypeError(f"Object {obj} is not JSON serializable")
    
    @staticmethod
    def safe_json_loads(json_str: str, default: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Safely load JSON string with error handling.
        
        Args:
            json_str: JSON string to parse
            default: Default value if parsing fails
            
        Returns:
            Parsed JSON dictionary or default value
        """
        try:
            return json.loads(json_str)
        except (json.JSONDecodeError, TypeError) as e:
            logger.warning(f"Failed to parse JSON: {e}")
            return default or {}
    
    @staticmethod
    def safe_json_dumps(data: Any, indent: Optional[int] = None) -> str:
        """
        Safely serialize data to JSON string with error handling.
        
        Args:
            data: Data to serialize
            indent: Number of spaces for indentation
            
        Returns:
            JSON string representation
        """
        try:
            return json.dumps(
                data, 
                default=JsonUtils.serialize_datetime,
                indent=indent,
                ensure_ascii=False
            )
        except (TypeError, ValueError) as e:
            logger.error(f"Failed to serialize to JSON: {e}")
            return "{}"
    
    @staticmethod
    def validate_json_structure(data: Dict[str, Any], required_keys: list) -> bool:
        """
        Validate if JSON data has required keys.
        
        Args:
            data: Dictionary to validate
            required_keys: List of required keys
            
        Returns:
            True if all required keys are present, False otherwise
        """
        return all(key in data for key in required_keys)
    
    @staticmethod
    def flatten_dict(data: Dict[str, Any], separator: str = ".") -> Dict[str, Any]:
        """
        Flatten nested dictionary.
        
        Args:
            data: Dictionary to flatten
            separator: Separator for nested keys
            
        Returns:
            Flattened dictionary
        """
        def _flatten(obj: Dict[str, Any], parent_key: str = "") -> Dict[str, Any]:
            items = []
            for key, value in obj.items():
                new_key = f"{parent_key}{separator}{key}" if parent_key else key
                if isinstance(value, dict):
                    items.extend(_flatten(value, new_key).items())
                else:
                    items.append((new_key, value))
            return dict(items)
        
        return _flatten(data)