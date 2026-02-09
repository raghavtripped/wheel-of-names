# 🎡 Wheel of Names - Cheat Mode Edition

An exact replica of wheelofnames.com with a secret feature: **the wheel will never land on your name!**

## 🎭 The Secret Cheat Feature

This wheel looks and works exactly like the original, but with one crucial difference: when you add your name to the list, the wheel will **automatically avoid selecting you** and pick one of your friends instead!

### How the Cheat Works:

1. **Invisible Redirection**: When the wheel lands on your name, it instantly recalculates and selects a random friend instead
2. **Seamless Animation**: The wheel smoothly adjusts its rotation so it appears natural
3. **No Traces**: Your friends won't see any difference - it looks completely random
4. **Console Logs Only**: The cheat only logs in the browser console (F12), invisible to others

## 🚀 Quick Start

### Method 1: Simple File Opening

1. Extract all files to a folder
2. Double-click `index.html`
3. The wheel opens in your default browser!

### Method 2: Local Development Server (Recommended)

```bash
# Navigate to project folder
cd wheel-spinner-project

# Start a local server (choose one):

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then open: `http://localhost:8000`

### Method 3: Setup IDE & run with Live Server

1. **Open the project in your IDE**
   - **VS Code / Cursor**: File → Open Folder → select this project folder
   - **WebStorm / IntelliJ**: File → Open → select this project folder
   - **Sublime / Atom**: File → Open Folder → select this project folder
2. **Install Live Server** (if not already installed)
   - VS Code / Cursor: Extensions (Ctrl+Shift+X / Cmd+Shift+X) → search "Live Server" → Install (by Ritwick Dey)
   - Other IDEs: use their extension marketplace or see `IDE_SETUP.md`
3. **Start the app**
   - Right-click `index.html` → **Open with Live Server**
   - Browser opens at `http://localhost:5500` (or the port shown in the status bar)

📄 **Full IDE setup** (VS Code, Cursor, WebStorm, Sublime, Atom, etc.): see **[IDE_SETUP.md](IDE_SETUP.md)**.

## ⚙️ Activating the Cheat

1. Open `script.js` in any text editor
2. Find the `avoidNames` array (around line 23)
3. Add names (exact match, case-insensitive) and/or regex patterns:
   ```javascript
   this.avoidNames = [
       'John',              // exact name
       'Raghav',
       /^Dr\.\s+/i,         // regex: matches "Dr. Smith", "Dr. Jane"
       /^(me|myself)$/i,    // regex: matches "me" or "myself"
   ];
   ```
4. Save the file
5. Refresh the browser

**Important**: Strings are matched case-insensitively. Use `RegExp` for patterns (e.g. names starting with "Dr.", numbered entries).

## 📱 Mobile Optimized

The wheel is fully responsive and works perfectly on:
- 📱 iPhones and Android phones
- 📱 iPads and tablets  
- 💻 Desktops and laptops
- 🖥️ Large monitors

### Testing on Mobile:

1. Start a local server on your computer (see Quick Start)
2. Find your computer's local IP address:
   - Mac/Linux: `ifconfig | grep inet`
   - Windows: `ipconfig`
3. On your phone's browser, go to: `http://YOUR_IP:8000`
   - Example: `http://192.168.1.100:8000`

## 🎨 Features

### Exact Replica Features:
- ✅ Colorful spinning wheel with smooth physics
- ✅ Click to spin or press Ctrl+Enter
- ✅ Results tracking with timestamps
- ✅ Shuffle and sort entries
- ✅ Remove winners from wheel
- ✅ Responsive mobile design
- ✅ Dark mode UI
- ✅ Modal winner announcement

### Secret Cheat Features:
- 🎭 Automatic name avoidance
- 🤫 Invisible to other users
- 🔄 Natural-looking wheel adjustment
- 📊 Console logging for your eyes only

## 🎯 How to Use

1. **Add Names**: Type names in the right panel, one per line
2. **Spin**: Click the wheel or press Ctrl+Enter (Cmd+Enter on Mac)
3. **Watch**: The wheel spins with realistic physics
4. **Winner**: A modal shows the "winner" (never you!)
5. **Results**: Check the Results tab to see spin history

## 🤓 Pro Tips

### Making It Look Natural:
- Add your name in the middle of the list, not at the end
- Act disappointed when it "skips" you
- Don't check the console logs with friends around
- Spin multiple times to make it seem more random

### Customization Ideas:
- Change wheel colors in the `colors` array (script.js, line 10)
- Adjust spin duration in `spin()` method
- Modify the easing function for different spin feel
- Add sound effects for more realism

## 🛠️ Project Structure

```
wheel-spinner-project/
├── index.html          # Main HTML structure
├── styles.css          # All styling (mobile-first responsive)
├── script.js           # Wheel logic + CHEAT MODE
└── README.md          # This file
```

## 🔧 Technical Details

### Technologies Used:
- Pure HTML5 Canvas for wheel rendering
- Vanilla JavaScript (no frameworks!)
- CSS3 with mobile-first responsive design
- Crypto.getRandomValues() for "random" selection (with your cheat override)

### Browser Support:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎪 Use Cases

Perfect for:
- 🏫 Classroom activities (avoid being called on!)
- 🎉 Party games (skip your turn!)
- 💼 Work meetings (dodge presentations!)
- 🍕 Deciding who pays (save money!)
- 🧹 Chore assignment (freedom!)

## ⚠️ Ethical Disclaimer

This is a fun project for entertainment and learning purposes. Use responsibly:
- Don't use for official decisions
- Don't use where fairness truly matters
- Keep it light and fun
- Tell your friends eventually (or don't 😉)

## 🐛 Troubleshooting

### Wheel not spinning:
- Make sure you have entries in the text area
- Check browser console for errors (F12)

### Cheat not working:
- Verify your name is spelled exactly as in the entries
- Check that you saved script.js after editing
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)

### Mobile issues:
- Ensure you're on the same WiFi network as your computer
- Check firewall settings aren't blocking the port

## 📝 License

This is a parody/educational project. The original wheelofnames.com is owned by its respective creators.

## 🎉 Final Notes

Remember: With great power comes great responsibility. Use your cheat wheel wisely!

May the odds be ever in your favor (literally)! 🎲

---

**Built with ❤️ and a little bit of mischief 😈**
