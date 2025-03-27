import threading
import os
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from typing import List
from config.database import container_collection
from docker_monitor import monitor_container, stop_monitoring, validate_container_id
from schema.schemas import list_container_serial, ContainerSchema

app = FastAPI()

@app.post("/add_container/", status_code=status.HTTP_201_CREATED)
async def add_container_api(container: ContainerSchema):
    """
    Add and start monitoring a new container with validation using Ngrok integration.
    The docker_monitor module will use the DOCKER_NGROK_URL environment variable, if set,
    to connect to the remote Docker host via Ngrok.
    """
    # Validate API key format (example validation)
    if len(container.api_key) != 32:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid API key format"
        )

    # Check for existing API key
    if container_collection.find_one({"api_key": container.api_key}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="API key already exists"
        )

    # Validate container exists on Docker host (Ngrok or local)
    if not validate_container_id(container.container_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid container ID or not found on Docker host"
        )

    # Save container info to database
    container_data = {
        "api_key": container.api_key,
        "container_id": container.container_id,
        "monitoring": True
    }
    result = container_collection.insert_one(container_data)

    # Start monitoring asynchronously in a separate thread
    try:
        thread = threading.Thread(
            target=monitor_container,
            args=(container.container_id,),
            daemon=True
        )
        thread.start()
    except Exception as e:
        container_collection.delete_one({"_id": result.inserted_id})
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to start monitoring: {str(e)}"
        )

    return {
        "message": "Container added and monitoring started",
        "container_id": str(result.inserted_id),
        "docker_id": container.container_id
    }

@app.delete("/remove_container/{api_key}", status_code=status.HTTP_200_OK)
async def remove_container_api(api_key: str):
    """Stop monitoring and remove container by API key"""
    container = container_collection.find_one({"api_key": api_key})
    
    if not container:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Container not found"
        )

    # Stop monitoring the container
    stop_monitoring(container["container_id"])
    
    # Remove from database
    container_collection.delete_one({"api_key": api_key})
    
    return {
        "message": f"Container with API key {api_key} removed",
        "docker_id": container["container_id"]
    }

@app.get("/containers/", response_model=List[dict])
async def list_containers():
    """List all monitored containers"""
    containers = list(container_collection.find())
    return list_container_serial(containers)

@app.get("/")
def health_check():
    return {
        "status": "active",
        "message": "Docker monitoring API is running.",
        "note": "Ngrok integration active if DOCKER_NGROK_URL is set."
    }
