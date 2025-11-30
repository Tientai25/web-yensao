#!/bin/bash
# Script để kill process đang dùng port 5000 (cho Git Bash)

PORT=5000

echo "Finding process using port $PORT..."

# Windows/Git Bash
if command -v netstat &> /dev/null; then
    PID=$(netstat -ano | grep ":$PORT" | grep LISTENING | awk '{print $5}' | head -1)
    if [ ! -z "$PID" ]; then
        echo "Found process with PID: $PID"
        echo "Killing process..."
        taskkill //F //PID $PID
        echo "✅ Process killed!"
    else
        echo "No process found using port $PORT"
    fi
else
    echo "netstat not found. Please manually check port $PORT"
fi

