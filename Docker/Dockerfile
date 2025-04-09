# Use Rocky Linux 8 as a base image
FROM rockylinux/rockylinux:8

# System Setup
RUN dnf -y update && \
    dnf -y install python39 wget epel-release curl tar gzip file net-tools iputils iproute procps-ng && \
    dnf clean all

# Download and install tini
RUN curl -L https://github.com/krallin/tini/releases/download/v0.19.0/tini -o /usr/local/bin/tini && \
    chmod +x /usr/local/bin/tini

# Copy the cadvisor binary from local context
COPY cadvisor-v0.52.1-linux-amd64 /usr/local/bin/cadvisor
RUN chmod +x /usr/local/bin/cadvisor

# Application Deployment
COPY Vulnerable-Web-Application/ /opt/vulnerable-web-app/
COPY http_server.py /opt/vulnerable-web-app/

# Network Configuration
EXPOSE 8080 8081

# Set working directory
WORKDIR /opt/vulnerable-web-app

# Create a Python virtual environment
RUN python3.9 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install additional network debugging tools
RUN pip install requests

# Runtime Configuration
ENTRYPOINT ["/usr/local/bin/tini", "--"]
CMD ["sh", "-c", "python3 http_server.py & /usr/local/bin/cadvisor -logtostderr -port=8081"]