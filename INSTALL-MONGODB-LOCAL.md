# Installing MongoDB Locally for Full Database Features

## Quick Installation Guide

### Step 1: Download MongoDB Community Server

I've opened the download page for you. On the MongoDB website:

1. **Version**: Select **7.0.14** (or latest 7.x - more stable than 8.0)
2. **Platform**: Windows
3. **Package**: MSI
4. Click **Download**

Direct link if needed: https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.14-signed.msi

### Step 2: Install MongoDB

1. **Run** the downloaded `.msi` installer
2. Click **Next**
3. Accept the license agreement
4. Choose **Complete** installation
5. **IMPORTANT**: On "Service Configuration" screen:
   - ✅ Check "Install MongoDB as a Service"
   - ✅ Service Name: MongoDB
   - ✅ Run service as Network Service user
   - ✅ Data Directory: `C:\Program Files\MongoDB\Server\7.0\data`
   - ✅ Log Directory: `C:\Program Files\MongoDB\Server\7.0\log`
6. **UNCHECK** "Install MongoDB Compass" (we already have it)
7. Click **Install**
8. Click **Finish**

### Step 3: Verify MongoDB is Running

Open PowerShell and run:

```powershell
# Check if MongoDB service is running
Get-Service MongoDB

# Should show:
# Status: Running
# Name: MongoDB
```

If it's not running, start it:
```powershell
Start-Service MongoDB
```

### Step 4: Update Your Application

Update `server\.env` to use local MongoDB:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medical-storage
JWT_SECRET=SecureMed2024!@#$%^&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890
```

### Step 5: Test the Connection

```powershell
cd "c:\Users\sride\Downloads\Telegram Desktop\secure-medical-storage\secure-medical-storage"
node server/check-database.js
```

Expected output:
```
✅ Connected to MongoDB
📊 DATABASE INFORMATION:
Database Name: medical-storage
Host: localhost
Port: 27017
```

### Step 6: Restart Your Website

Stop the current website (close the PowerShell window running it) and restart:

```powershell
cd "c:\Users\sride\Downloads\Telegram Desktop\secure-medical-storage\secure-medical-storage"
npm run dev
```

You should now see:
```
✅ Connected to MongoDB - Database features enabled
```

### Step 7: Test Full Functionality

Open http://localhost:3000 and you can now:
- ✅ Register new users
- ✅ Login/logout
- ✅ Upload medical records
- ✅ Create reminders
- ✅ Store doctor information
- ✅ Full database features!

---

## MongoDB Compass Connection

If you want to view your data in MongoDB Compass:

**Connection String:**
```
mongodb://localhost:27017
```

1. Open MongoDB Compass
2. Paste the connection string above
3. Click "Connect"
4. You'll see your `medical-storage` database appear when you create data

---

## MongoDB Service Management Commands

```powershell
# Check service status
Get-Service MongoDB

# Start MongoDB
Start-Service MongoDB

# Stop MongoDB
Stop-Service MongoDB

# Restart MongoDB
Restart-Service MongoDB
```

---

## Troubleshooting

### MongoDB Service Won't Start

**Solution 1: Run as Administrator**
```powershell
# Open PowerShell as Administrator
Start-Service MongoDB
```

**Solution 2: Check if port 27017 is in use**
```powershell
netstat -ano | findstr :27017
```

**Solution 3: Manually create data directory**
```powershell
New-Item -ItemType Directory -Force -Path "C:\data\db"
```

### Connection Still Fails

1. Make sure MongoDB service is running:
   ```powershell
   Get-Service MongoDB
   ```

2. Check if you can connect with mongo shell:
   ```powershell
   "C:\Program Files\MongoDB\Server\7.0\bin\mongosh.exe"
   ```

3. Verify firewall isn't blocking port 27017

---

## Alternative: Quick Install via Chocolatey

If you have Chocolatey package manager:

```powershell
# Install MongoDB
choco install mongodb

# Start service
net start MongoDB
```

---

## Data Storage Location

Your MongoDB data will be stored at:
```
C:\Program Files\MongoDB\Server\7.0\data
```

To backup your data, copy this entire folder.

---

## After Installation Checklist

- [ ] MongoDB installer downloaded
- [ ] MongoDB installed with "Install as Service" checked
- [ ] MongoDB service is running (verify with `Get-Service MongoDB`)
- [ ] Updated `server\.env` with `mongodb://localhost:27017/medical-storage`
- [ ] Tested connection with `node server/check-database.js`
- [ ] Restarted website with `npm run dev`
- [ ] Registered a test user and verified database works

---

**Installation time: ~10 minutes**

**Once done, tell me and I'll help you test the full database functionality!**
