# docker_monitor.py (simplified with print)
import docker
import os
import time

# Dictionary to track monitored containers
monitoring_containers = {}

# Configure Docker client
client = docker.DockerClient(
    base_url="http://shining-enabling-unicorn.ngrok-free.app:2375",
    timeout=1
)

def validate_container_id(container_id: str) -> bool:
    """Verify container exists on Docker host"""
    try:
        client.containers.get(container_id)
        return True
    except docker.errors.NotFound:
        print(f"Error: Container {container_id} not found")
        return False
    except docker.errors.APIError as e:
        print(f"Error: Docker API validation failed - {str(e)}")
        return False

def monitor_container(container_id: str):
    """Enhanced monitoring with proper cleanup"""
    try:
        container = client.containers.get(container_id)
        monitoring_containers[container_id] = True
        print(f"Started monitoring container: {container_id}")
        
        while monitoring_containers.get(container_id, False):
            # Existing monitoring logic
            logs = container.logs(tail=10).decode("utf-8")
            stats = container.stats(stream=False)
            
            # Print metrics
            print(f"\nContainer {container_id} Metrics:")
            print(f"Logs (last 10 lines):\n{logs}")
            print(f"CPU Usage: {stats['cpu_stats']['cpu_usage']['total_usage']}")
            print(f"Memory Usage: {stats['memory_stats']['usage']} bytes")
            
            time.sleep(5)
            
    except docker.errors.APIError as e:
        print(f"Error: Docker API failure - {str(e)}")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
    finally:
        monitoring_containers.pop(container_id, None)
        print(f"Stopped monitoring container: {container_id}")

def stop_monitoring(container_id: str):
    """Stop monitoring a container"""
    if container_id in monitoring_containers:
        monitoring_containers[container_id] = False
        print(f"Stopping monitoring for container: {container_id}")
