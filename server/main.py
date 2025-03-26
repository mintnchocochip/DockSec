from fastapi import FastAPI, HTTPException
from config.database import container_collection
from schema.schemas import ContainerSchema, individual_container_serial, list_container_serial
from bson import ObjectId

app = FastAPI()

@app.post("/add_container/")
async def add_container_api(container: ContainerSchema):
    """ Start monitoring a new container """
    # Check if container with this API key already exists
    existing_container = container_collection.find_one({"api_key": container.api_key})
    if existing_container:
        raise HTTPException(status_code=400, detail="Container with this API key already exists")
    
    # Insert the container
    container_dict = container.dict()
    result = container_collection.insert_one(container_dict)
    
    return {
        "message": "Container added to MongoDB", 
        "container_id": str(result.inserted_id)
    }

@app.delete("/remove_container/{api_key}")
async def remove_container_api(api_key: str):
    """ Stop monitoring a container """
    result = container_collection.delete_one({"api_key": api_key})
    
    if result.deleted_count > 0:
        return {"message": f"Container with API key {api_key} removed from MongoDB"}
    
    raise HTTPException(status_code=404, detail="Container not found")

@app.get("/containers/")
async def list_containers():
    """ List all monitored containers """
    containers = list(container_collection.find())
    return list_container_serial(containers)

@app.get("/")
def read_root():
    return {"message": "FastAPI is connected to MongoDB!"}