from celery import Celery
from docker_monitor import monitor_container

app = Celery("tasks", broker="redis://localhost:6379")

@app.task
def start_monitoring_task(container_id, api_key):
    monitor_container(container_id, api_key)
