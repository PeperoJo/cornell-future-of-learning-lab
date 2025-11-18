# cornell-future-of-learning-lab

## Local Development

To view the site locally with component loading working, you need to run a local web server (the `fetch()` API doesn't work with the `file://` protocol).

### Option 1: Python (Recommended)
```bash
python3 serve.py
```
Then open http://localhost:8000 in your browser.

### Option 2: Node.js
```bash
npm run serve
```
Or if you don't have npm:
```bash
npx serve . -p 8000
```

### Option 3: Python built-in server
```bash
python3 -m http.server 8000
```

### Option 4: VS Code Live Server
If you're using VS Code, install the "Live Server" extension and click "Go Live" in the status bar.