# 🎡 QUICK START GUIDE

## Get Started in 30 Seconds!

### Step 1: Activate Your Cheat
1. Open `script.js` in any text editor (Notepad, VS Code, etc.)
2. Find the `avoidNames` array in script.js
3. Add your name(s) or regex: e.g. `['Raghav', 'John', /^Dr\./i]`
4. Save the file

### Step 2: Run the Wheel
**Easiest way:**
- Just double-click `index.html`
- It opens in your browser!

**Better way (for mobile testing):**
```bash
# In terminal/command prompt:
cd wheel-spinner-project
python3 -m http.server 8000

# Then open: http://localhost:8000
```

### Step 3: Test It!
1. Add some names including yours
2. Spin the wheel multiple times
3. Watch it NEVER land on you! 🎭

## 📱 Test on Your Phone

1. Start the server on your computer (see above)
2. Find your computer's IP:
   - Mac/Linux: Open Terminal, type `ifconfig | grep inet`
   - Windows: Open CMD, type `ipconfig`
   - Look for something like `192.168.1.100`
3. On your phone, open browser and go to:
   `http://YOUR_IP:8000`
   (Example: `http://192.168.1.100:8000`)

## 🎯 Pro Tips

- **Stay Sneaky**: Don't open the browser console (F12) when friends are watching
- **Look Natural**: Add your name in the middle of the list
- **Act Surprised**: Pretend you're disappointed when it skips you
- **Test First**: Spin alone a few times to make sure it works

## ⚡ Troubleshooting

**Cheat not working?**
- Make sure your name spelling EXACTLY matches what you type in the entries
- Save `script.js` after editing
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

**Can't access on phone?**
- Make sure phone and computer are on same WiFi
- Check your firewall settings
- Try port 3000 or 5500 instead of 8000

## 🎪 You're All Set!

Now go forth and avoid those chores! 😎

---

**Questions?** Check the full README.md for detailed instructions.
