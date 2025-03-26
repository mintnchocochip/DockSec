import docker
import psutil
import time
from detection import analyze_logs, analyze_metrics

client = docker.from_env()
monitoring_containers = {}

async def monitor_container(container_id, api_key):
    """ Monitor logs and metrics from a container """
    container = client.containers.get(container_id)
    monitoring_containers[container_id] = True  # Flag to keep monitoring

    while monitoring_containers[container_id]:
        logs = container.logs(tail=10).decode("utf-8")
        stats = container.stats(stream=False)

        # Extract system metrics
        cpu_usage = stats["cpu_stats"]["cpu_usage"]["total_usage"]
        mem_usage = stats["memory_stats"]["usage"]
        net_in = stats["networks"]["eth0"]["rx_bytes"]
        net_out = stats["networks"]["eth0"]["tx_bytes"]

        # Analyze for anomalies
        log_anomaly = analyze_logs(logs)
        metric_anomaly = analyze_metrics(cpu_usage, mem_usage, net_in, net_out)

        if log_anomaly or metric_anomaly:
            print(f"🚨 Anomaly Detected in {container_id} 🚨")

        time.sleep(5)  # Check every 5 seconds

def stop_monitoring(container_id):
    """ Stop monitoring a container """
    if container_id in monitoring_containers:
        monitoring_containers[container_id] = False
