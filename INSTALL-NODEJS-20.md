# Installing Node.js v20 to Fix MongoDB SSL Error

## Why Node.js v20?

Node.js v22 has a known SSL/TLS compatibility issue with MongoDB Atlas that causes the error:
```
error:0A000438:SSL routines:ssl3_read_bytes:tlsv1 alert internal error
```

Node.js v20 (LTS) uses an older OpenSSL version that works perfectly with MongoDB Atlas.

## Installation Steps

### Step 1: Download Node.js v20 LTS

I've opened the download link for you. If it didn't open automatically, go to:
```
https://nodejs.org/dist/v20.18.1/node-v20.18.1-x64.msi
```

Or visit: https://nodejs.org/ and download **Node.js 20.x LTS**

### Step 2: Run the Installer

1. **Run** the downloaded `node-v20.18.1-x64.msi` file
2. Click **Next** through the installation wizard
3. **Accept** the license agreement
4. Keep the **default installation path**: `C:\Program Files\nodejs\`
5. Make sure these are checked:
   - ✅ Node.js runtime
   - ✅ npm package manager
   - ✅ Add to PATH
6. Click **Next** then **Install**
7. Click **Finish** when done

### Step 3: Restart Your Computer

**IMPORTANT:** You MUST restart your computer for the new Node.js version to take effect.

After restart:
1. Open PowerShell
2. Run: `node --version`
3. You should see: `v20.18.1`

### Step 4: Verify Installation

After restarting, open PowerShell and run:

```powershell
# Check Node.js version
node --version
# Should show: v20.18.1

# Check npm version
npm --version
# Should show: 10.x.x
```

### Step 5: Test MongoDB Connection

```powershell
cd "c:\Users\sride\Downloads\Telegram Desktop\secure-medical-storage\secure-medical-storage"
node server/check-database.js
```

You should now see:
```
✅ Connected to MongoDB
📊 DATABASE INFORMATION:
Database Name: medical-storage
Host: cluster0.05z5eb0.mongodb.net
```

### Step 6: Start Your Website

```powershell
npm run dev
```

Now both frontend and backend with **full database features** will work!

---

## After Installation Checklist

- [ ] Downloaded Node.js v20.18.1 installer
- [ ] Ran the installer and completed installation
- [ ] Restarted computer (REQUIRED!)
- [ ] Verified Node.js version with `node --version`
- [ ] Tested MongoDB connection with `node server/check-database.js`
- [ ] Started website with `npm run dev`

---

## Troubleshooting

### Node.js version still shows v22 after install
**Solution:** You forgot to restart your computer. Restart now!

### npm commands not working
**Solution:** 
1. Close all PowerShell/terminal windows
2. Restart your computer
3. Open a fresh PowerShell window

### Still getting SSL error
**Solution:**
1. Make sure you restarted your computer
2. Clear npm cache: `npm cache clean --force`
3. Reinstall dependencies: 
   ```powershell
   cd server
   rm -r node_modules
   npm install
   ```

---

## What Happens Next?

After installing Node.js v20 and restarting:

1. **MongoDB Atlas will connect successfully** ✅
2. **All database features will work** ✅
3. **User registration/login will work** ✅
4. **Medical records upload will work** ✅
5. **Reminders will work** ✅
6. **Full website functionality** ✅

---

## Quick Reference

**Node.js v20 Download:** https://nodejs.org/dist/v20.18.1/node-v20.18.1-x64.msi

**After restart, run these commands:**
```powershell
cd "c:\Users\sride\Downloads\Telegram Desktop\secure-medical-storage\secure-medical-storage"
node --version          # Verify it shows v20.x.x
node server/check-database.js  # Test database
npm run dev             # Start website
```

**Your website will be at:** http://localhost:3000

---

**REMEMBER: You MUST restart your computer after installation!**
