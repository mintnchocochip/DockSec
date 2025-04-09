import http.server
import socketserver
import os

# Configuration
PORT = 8080  # Port to serve on
DIRECTORY = "/opt/vulnerable-web-app"  # Directory to serve files from

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == "__main__":
    os.chdir(DIRECTORY)  # Change to the directory to serve files
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Serving HTTP on port {PORT} from directory {DIRECTORY}")
        httpd.serve_forever()
