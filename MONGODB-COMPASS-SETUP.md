# MongoDB Atlas + Compass Setup Guide

This guide will help you set up a free cloud MongoDB database and connect to it using MongoDB Compass (GUI tool).

## Part 1: Install MongoDB Compass

### Download and Install
1. Go to: https://www.mongodb.com/try/download/compass
2. Click **Download** (it will auto-detect Windows)
3. Run the installer (MongoDB-Compass-Setup.exe)
4. Follow the installation wizard (default settings are fine)
5. Launch MongoDB Compass after installation

## Part 2: Create MongoDB Atlas Account (Free Cloud Database)

### Step 1: Sign Up
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with email/Google/GitHub (FREE forever)
3. You'll be asked a few questions - select:
   - Goal: "Learn MongoDB"
   - Use case: "Personal/Hobby"
   - Preferred language: "JavaScript"

### Step 2: Create a Free Cluster
1. You'll see "Deploy a cloud database" - Click **Create**
2. Choose **M0 FREE** tier (512 MB storage - perfect for development)
3. Cloud Provider: Choose **AWS** (or any available)
4. Region: Choose one closest to you (e.g., "Mumbai (ap-south-1)" for India)
5. Cluster Name: Keep default or name it "MedicalStorage"
6. Click **Create Cluster** (takes 3-5 minutes to provision)

### Step 3: Create Database User
While cluster is creating:
1. You'll see "Security Quickstart"
2. **Authentication Method**: Password
3. **Username**: Enter `medicaladmin` (or your preferred username)
4. **Password**: Click **Autogenerate Secure Password**
   - **⚠️ IMPORTANT**: Click the COPY button and save this password in a safe place!
   - You'll need it for both Compass and your application
5. Click **Create User**

### Step 4: Set Network Access
1. Next screen asks "Where would you like to connect from?"
2. Select **My Local Environment**
3. Click **Add My Current IP Address**
4. Also click **Add a Different IP Address** and enter: `0.0.0.0/0`
   - This allows connections from anywhere (good for development/Vercel deployment)
5. Click **Finish and Close**

## Part 3: Connect MongoDB Compass to Atlas

### Step 1: Get Connection String from Atlas
1. In Atlas dashboard, click **Database** in the left sidebar
2. Click the **Connect** button on your cluster
3. Select **Compass**
4. Copy the connection string - it looks like:
   ```
   mongodb+srv://medicaladmin:<password>@cluster0.xxxxx.mongodb.net/
   ```

### Step 2: Connect via Compass
1. Open **MongoDB Compass** application
2. You'll see "New Connection" screen
3. Paste your connection string in the URI field
4. **Replace** `<password>` with your actual password (the one you copied earlier)
5. The final connection string should look like:
   ```
   mongodb+srv://medicaladmin:YourActualPassword123@cluster0.xxxxx.mongodb.net/
   ```
6. Click **Save & Connect**
7. Give it a name like "Medical Storage Atlas"
8. Click **Connect**

### Step 3: Create the Database
1. Once connected, click **Create Database** (or you'll see list of existing databases)
2. Database Name: `medical-storage`
3. Collection Name: `users` (we'll create more collections later)
4. Click **Create Database**

## Part 4: Update Your Application

### Update server/.env File
1. Open `server/.env` in your project
2. Update the `MONGODB_URI` line with your Atlas connection string:

```env
# Replace this line:
MONGODB_URI=mongodb://localhost:27017/medical-storage

# With your Atlas connection string (remember to replace <password>):
MONGODB_URI=mongodb+srv://medicaladmin:YourActualPassword123@cluster0.xxxxx.mongodb.net/medical-storage?retryWrites=true&w=majority
```

**Important Notes:**
- Replace `medicaladmin` with your username
- Replace `YourActualPassword123` with your actual password
- Make sure `/medical-storage` is added before the `?`
- Remove any `<` or `>` brackets

### Test the Connection
Run from project root:
```powershell
cd "c:\Users\sride\Downloads\Telegram Desktop\secure-medical-storage\secure-medical-storage"
node server/check-database.js
```

Expected output:
```
✅ Connected to MongoDB
📊 DATABASE INFORMATION:
Database Name: medical-storage
Host: cluster0.xxxxx.mongodb.net
```

## Part 5: Start Your Application

### Start Backend Server
```powershell
cd "c:\Users\sride\Downloads\Telegram Desktop\secure-medical-storage\secure-medical-storage\server"
node index.js
```

Expected output:
```
Server running on port 5000
✅ Connected to MongoDB - Database features enabled
```

### Start Frontend (in a new terminal)
```powershell
cd "c:\Users\sride\Downloads\Telegram Desktop\secure-medical-storage\secure-medical-storage\client"
npm start
```

The website will open at: http://localhost:3000

## Using MongoDB Compass

### View Your Data
1. In Compass, expand your `medical-storage` database
2. You'll see collections appear as users register and add data:
   - `users` - User accounts
   - `medicalrecords` - Uploaded medical documents
   - `reminders` - Medicine reminders
   - `doctors` - Doctor contacts

### Useful Features in Compass
- **View Documents**: Click on a collection to see all data
- **Add Data**: Click "Insert Document" to manually add records
- **Search**: Use the filter bar to query specific documents
- **Edit**: Double-click on any field to edit
- **Delete**: Click trash icon to remove documents
- **Export**: Export data to JSON/CSV

## Troubleshooting

### Can't Connect to Atlas
- **Check password**: Make sure you replaced `<password>` with actual password (no brackets)
- **Network Access**: Ensure 0.0.0.0/0 is added in Atlas Network Access settings
- **Firewall**: Disable antivirus/firewall temporarily to test

### Special Characters in Password
If your password has special characters, URL-encode them:
- `@` → `%40`
- `#` → `%23`
- `/` → `%2F`
- `:` → `%3A`

Or regenerate a simpler password without special characters.

### Application Can't Connect
- Make sure `server/.env` has the correct `MONGODB_URI`
- Restart the server after changing `.env`
- Check that the database name `/medical-storage` is in the connection string

---

## Quick Reference

**Atlas Dashboard**: https://cloud.mongodb.com/

**Connection String Format**:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

**Example for this project**:
```
mongodb+srv://medicaladmin:MyPassword123@cluster0.abc123.mongodb.net/medical-storage?retryWrites=true&w=majority
```

---

**Next Steps**:
1. ✅ Install MongoDB Compass
2. ✅ Create MongoDB Atlas account
3. ✅ Connect Compass to Atlas
4. ✅ Update `server/.env`
5. ✅ Test connection
6. ✅ Start the application

Let me know when you're ready to test!
