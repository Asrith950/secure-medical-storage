# 🚀 How to Start Your Website Every Time

## ⚡ EASIEST METHOD (Recommended)

### Just Double-Click This File:
```
START-EVERYTHING.bat
```

**That's it!** Wait 30-40 seconds and your browser will open automatically.

---

## 📋 What Happens When You Run START-EVERYTHING.bat

1. **MongoDB starts** (database server)
2. **Backend starts** (API server on port 5000)
3. **Frontend starts** (React app on port 3000)
4. **Browser opens** to http://localhost:3000

You'll see **3-4 terminal windows open** - keep them all open while using the website!

---

## ⏱️ Typical Startup Time

- MongoDB: ~3 seconds
- Backend: ~5 seconds
- Frontend: ~25-35 seconds (React compilation)
- **Total: ~40 seconds**

---

## 🛑 How to Stop Everything

### Option 1 (Easiest):
Double-click: `STOP-EVERYTHING.bat`

### Option 2:
Close all the terminal windows that opened

---

## ⚠️ Troubleshooting

### If the browser shows "Can't reach this page":

**Wait a bit longer!** React takes 30-40 seconds to compile on first start.

**Then refresh the browser** (press F5 or click the Refresh button)

---

### If START-EVERYTHING.bat doesn't work:

**Manual Start Method:**

1. **Open PowerShell as Administrator**

2. **Start Backend:**
```powershell
cd "c:\Users\sride\OneDrive\Documents\secure-medical-storage\secure-medical-storage\server"
npm run dev
```
Keep this window open!

3. **Open ANOTHER PowerShell window**

4. **Start Frontend:**
```powershell
cd "c:\Users\sride\OneDrive\Documents\secure-medical-storage\secure-medical-storage\client"
$env:BROWSER='none'
npm start
```
Keep this window open too!

5. **Wait for "Compiled successfully!" message**

6. **Open browser to: http://localhost:3000**

---

## 📝 Quick Reference

| What | Where | Port |
|------|-------|------|
| **Website** | http://localhost:3000 | 3000 |
| **API** | http://localhost:5000 | 5000 |
| **Database** | MongoDB Compass: `mongodb://localhost:27017/medical-storage` | 27017 |

---

## ✅ How to Know It's Working

Look for these messages in the terminal windows:

**Backend:**
```
Server running on port 5000
✅ Connected to MongoDB - Database features enabled
```

**Frontend:**
```
Compiled successfully!
You can now view client in the browser.
Local: http://localhost:3000
```

---

## 🎯 Daily Usage

1. **Morning:** Double-click `START-EVERYTHING.bat`
2. **Wait:** ~40 seconds
3. **Use:** Website opens automatically
4. **Evening:** Double-click `STOP-EVERYTHING.bat`

**That's it! Your data is saved automatically in MongoDB.**

---

## 💡 Pro Tips

- **Bookmark http://localhost:3000** in your browser
- **Don't close the terminal windows** while using the website
- **Your data persists** - it's saved even after stopping everything
- **First start of the day** takes ~40 seconds, subsequent refreshes are instant

---

## 🆘 Need Help?

If you see any errors:
1. Run `STOP-EVERYTHING.bat` first
2. Wait 5 seconds
3. Run `START-EVERYTHING.bat` again
4. Wait the full 40 seconds

**Still having issues?** Check if:
- MongoDB is installed: `C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe`
- Node.js is installed: Open PowerShell and type `node --version`

---

**Your website is ready to use! 🎉**
