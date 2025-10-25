#!/bin/bash

echo "Starting AI Chat Interface..."
echo ""
echo "Opening demo page in your default browser..."

# Detect OS and open browser accordingly
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open demo.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open demo.html
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    # Windows (Git Bash)
    start demo.html
else
    echo "Please open demo.html in your browser manually"
fi

echo ""
echo "To start a local server:"
echo "1. Install Node.js if not already installed"
echo "2. Run: npm install"
echo "3. Run: npm start"
echo ""
echo "Or use Python server:"
echo "python3 -m http.server 8000"
echo ""
