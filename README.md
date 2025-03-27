# GlitchCon'25 (Team No: 15)

## Problem Statement TGG5: Secure Cloud Containers
Context:
Containerized applications (Kubernetes, Docker) are vulnerable to cyberattacks. AI-driven security solutions can strengthen protection.

Challenge:
Develop a security system that detects vulnerabilities and safeguards cloud-based containers.

### Core Requirements:

AI-powered vulnerability scanning for cloud containers.

Real-time threat monitoring and automated security policies.

DevSecOps integration for secure software deployment.

Bonus Features:

AI-driven anomaly detection in containerized environments.

Automated patching and compliance tracking.*

## Project Overview

This project is a dashboard solution that continuously monitors Docker container logs sourced from a Cloud Service Provider's (CSP's) API. The key features include:

- **ML-Based Anomaly Detection:**  
  An LSTM model, trained on local Docker logs, continuously analyzes container logs to detect anomalies. It cross-references AI predictions with system utilization metrics to determine if a container is under attack. If an anomaly is confirmed, the system can automatically pause the affected Docker container.

- **DevSecOps Integration:**  
  The dashboard integrates with [Anchore](https://anchore.com/) for code analysis to detect known vulnerabilities (CVEs) in the codebase. Anchore provides actionable insights and patching suggestions to improve the security posture of the application.

- **Backend Technology:**  
  The backend is built using Python FastAPI, allowing for concurrent monitoring of multiple Docker containers. This robust backend architecture supports real-time data ingestion and processing, ensuring timely anomaly detection and incident response.

- **Vulnerable Application:**  
  A deliberately vulnerable web application, known to have multiple security vulnerabilities, is used to simulate various attack vectors. This helps in training and evaluating the performance of the anomaly detection system.

> **Note:** Full end-to-end functionality cannot be demonstrated currently as cloud deployment is not possible. The dashboard relies on the CSP's API for live monitoring, which we cannot simulate fully in a local setup. Efforts to deploy using tools like cAdvisor and ngrok were hindered by network restrictions (e.g., laptop firewall, VIT router, personal hotspot issues).

## System Architecture

The overall system architecture consists of the following components:

- **Docker Container Log Collection:**  
  Containers continuously generate logs that are collected via the CSP's API.
  
- **Anomaly Detection Module:**  
  An LSTM model processes the logs to detect anomalies. The model compares log-based anomalies with system utilization metrics to assess potential attacks.

- **DevSecOps Integration:**  
  Anchore scans the container images and codebase to identify vulnerabilities and recommend patches.

- **FastAPI Backend:**  
  A Python FastAPI backend orchestrates the data flow, handling real-time log ingestion, anomaly analysis, and integration with external APIs.

- **Dashboard:**  
  A user-friendly dashboard displays real-time alerts, system metrics, and vulnerability reports.

### Flowchart Diagram (Architecture)

```mermaid
flowchart TD
    A[Docker Containers] -->|Logs| B[CSP's API]
    B --> C[FastAPI Backend]
    C --> D[Log Processing Module]
    D --> E[LSTM Anomaly Detection]
    D --> F[System Utilization Analysis]
    E --> G[Anomaly Alerts]
    F --> G
    C --> H[Anchore Code Analysis]
    H --> I[Vulnerability Reports]
    G --> J[Dashboard UI]
    I --> J
    J --> K[Admin Actions like Pause Container]
 ```
### Data Flow diagram
```mermaid 
flowchart LR
    A[Container Logs] --> B[API Ingestion]
    B --> C[FastAPI Backend]
    C --> D[LSTM Anomaly Detection]
    C --> E[System Metrics Monitor]
    D & E --> F[Anomaly Correlation Engine]
    F --> G[Alert Generation]
    G --> H[Dashboard Display]
    H --> I[Automated Container Management]
```
#### Vercel Link: https://front-end-ashen-ten.vercel.app/
