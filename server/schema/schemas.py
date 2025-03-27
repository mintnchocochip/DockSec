from pydantic import BaseModel
from typing import Optional

class ContainerSchema(BaseModel):
    api_key: str
    container_id: str
    monitoring: bool = True

def individual_container_serial(container) -> dict:
    return {
        "id": str(container.get('_id', '')),
        "api_key": container.get('api_key', ''),
        "container_id": container.get('container_id', ''),
        "monitoring": container.get('monitoring', True)
    }

def list_container_serial(container_list) -> list:
    return [individual_container_serial(container) for container in container_list]