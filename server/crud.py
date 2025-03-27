from config.database import container_collection

def add_container(api_key: str):
    """ Start monitoring a new container """
    container = {"api_key": api_key}
    result = container_collection.insert_one(container)
    return result.inserted_id

def remove_container(api_key: str):
    """ Stop monitoring a container """
    result = container_collection.delete_one({"api_key": api_key})
    return result.deleted_count > 0

def get_all_containers():
    """ List all monitored containers """
    return list(container_collection.find({}, {"_id": 0}))  # Exclude MongoDB's default _id
