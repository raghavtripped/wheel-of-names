# 🛠️ Opening in Your Favorite IDE

## VS Code

### Method 1: Drag and Drop
1. Open VS Code
2. Drag the `wheel-spinner-project` folder onto the VS Code window
3. Done!

### Method 2: File Menu
1. Open VS Code
2. File → Open Folder
3. Select `wheel-spinner-project`
4. Click "Open"

### Running with Live Server:
1. Install "Live Server" extension by Ritwick Dey
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Browser opens automatically at `http://localhost:5500`

---

## Cursor IDE

### Opening:
1. Open Cursor
2. File → Open Folder (or Cmd+O / Ctrl+O)
3. Navigate to `wheel-spinner-project`
4. Click "Open"

### Running:
Same as VS Code - install Live Server extension and use it!

---

## Antigravity IDE

### Opening:
1. Launch Antigravity
2. File → Open Workspace
3. Browse to `wheel-spinner-project` folder
4. Click "Select Folder"

### Running:
1. Use the built-in preview feature
2. Or install Live Server extension
3. Right-click `index.html` → Open with Live Server

---

## WebStorm / IntelliJ IDEA

### Opening:
1. File → Open
2. Select `wheel-spinner-project` folder
3. Click OK

### Running:
1. Right-click `index.html`
2. Select "Open in Browser"
3. Choose your browser

---

## Sublime Text

### Opening:
1. File → Open Folder
2. Select `wheel-spinner-project`
3. Click "Select Folder"

### Running:
1. Install "Browser Sync" package
2. Or manually open `index.html` in browser

---

## Atom

### Opening:
1. File → Add Project Folder
2. Select `wheel-spinner-project`
3. Click "Select Folder"

### Running:
1. Install "atom-live-server" package
2. Packages → Live Server → Start Server

---

## Any Text Editor (Notepad++, etc.)

### Opening Files:
1. File → Open
2. Navigate to project folder
3. Open `index.html`, `script.js`, or `styles.css`

### Running:
1. Navigate to project folder in File Explorer/Finder
2. Double-click `index.html`
3. Opens in default browser!

---

## Quick Terminal Commands

### Navigate to project:
```bash
cd path/to/wheel-spinner-project
```

### Start local server:
```bash
# Python (recommended - works on Mac/Linux/Windows)
python3 -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then open: **http://localhost:8000**

---

## Editing the Cheat Feature

**No matter which IDE you use:**

1. Open `script.js`
2. Find the `avoidNames` array
3. Add names or regex patterns:
   ```javascript
   this.avoidNames = ['Sarah', 'John', /^Dr\./i];
   ```
4. Save (Cmd+S / Ctrl+S)
5. Refresh browser

---

## Tips for All IDEs

- **Auto-save**: Enable auto-save so changes apply immediately
- **Side-by-side**: Open browser and IDE side-by-side
- **Console**: Keep browser DevTools open (F12) to see cheat logs
- **Format**: Use "Format Document" to keep code clean

---

## Recommended Extensions (for supported IDEs)

- **Live Server** - Auto-refresh browser on save
- **Prettier** - Code formatting
- **ESLint** - JavaScript linting
- **Auto Rename Tag** - HTML tag pairs
- **Color Highlight** - See colors in CSS

---

**Happy Coding! 🚀**

May your wheel never land on you! 🎡
