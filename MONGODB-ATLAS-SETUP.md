# MongoDB Atlas Setup Guide

Follow these steps to set up a free cloud MongoDB database for your medical storage website.

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with your email or Google/GitHub account
3. Choose the **FREE** tier (M0 Sandbox - 512 MB storage)

## Step 2: Create a Cluster

1. After signing up, you'll be prompted to create a cluster
2. **Choose Cloud Provider**: Select any (AWS, Google Cloud, or Azure)
3. **Choose Region**: Select the region closest to you for better performance
4. **Cluster Tier**: Make sure **M0 Sandbox (FREE)** is selected
5. **Cluster Name**: You can keep the default or name it "medical-storage"
6. Click **Create Cluster** (takes 3-5 minutes to provision)

## Step 3: Configure Database Access

1. Click **Database Access** in the left sidebar
2. Click **Add New Database User**
3. Choose **Password** authentication
4. **Username**: Create a username (e.g., `medicaladmin`)
5. **Password**: Click **Autogenerate Secure Password** and COPY IT immediately
   - Store this password safely - you'll need it for the connection string
6. **Database User Privileges**: Select **Read and write to any database**
7. Click **Add User**

## Step 4: Configure Network Access

1. Click **Network Access** in the left sidebar
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (for development/testing)
   - This adds `0.0.0.0/0` which allows connections from any IP
   - For production, you'd want to restrict this to specific IPs
4. Click **Confirm**

## Step 5: Get Your Connection String

1. Click **Database** in the left sidebar (or go to Clusters)
2. Click **Connect** button on your cluster
3. Choose **Connect your application**
4. **Driver**: Select **Node.js**
5. **Version**: Select the latest version
6. **Copy the connection string** - it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Your Local .env File

1. Open `server/.env` in your project
2. Replace the `MONGODB_URI` line with your Atlas connection string
3. **IMPORTANT**: Replace `<username>` and `<password>` in the string with your actual credentials

Example:
```env
# OLD (local MongoDB):
MONGODB_URI=mongodb://localhost:27017/medical-storage

# NEW (MongoDB Atlas):
MONGODB_URI=mongodb+srv://medicaladmin:YourSecurePassword123@cluster0.xxxxx.mongodb.net/medical-storage?retryWrites=true&w=majority
```

**Note**: Make sure to:
- Replace `<username>` with your database username
- Replace `<password>` with the password you copied
- Add `/medical-storage` before the `?` to specify the database name

## Step 7: Test the Connection

Run this command from your project root:
```powershell
cd "c:\Users\sride\Downloads\Telegram Desktop\secure-medical-storage\secure-medical-storage"
node server/check-database.js
```

You should see:
```
✅ Connected to MongoDB
📊 DATABASE INFORMATION:
Database Name: medical-storage
Host: cluster0.xxxxx.mongodb.net
```

## Step 8: Start Your Server

```powershell
cd server
node index.js
```

You should see:
```
Server running on port 5000
✅ Connected to MongoDB - Database features enabled
```

## Common Issues & Solutions

### Issue: "Authentication failed"
- **Solution**: Check that you replaced `<username>` and `<password>` correctly in the connection string
- The password should NOT have `<` or `>` brackets around it

### Issue: "IP not whitelisted"
- **Solution**: Go back to Network Access and make sure 0.0.0.0/0 is added

### Issue: "Connection timeout"
- **Solution**: Check your internet connection
- Try a different region when creating the cluster

### Issue: Special characters in password
- **Solution**: If your password has special characters like `@`, `#`, `/`, you need to URL-encode them:
  - `@` becomes `%40`
  - `#` becomes `%23`
  - `/` becomes `%2F`
  - Or regenerate a simpler password without special characters

## For Vercel Deployment

When deploying to Vercel, you'll need to:
1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add `MONGODB_URI` with your Atlas connection string
4. Also add `JWT_SECRET` and other required environment variables

---

**Ready to proceed?** Follow the steps above, then let me know once you've:
1. Created your MongoDB Atlas account
2. Set up a cluster
3. Created a database user
4. Got your connection string

I'll help you test the connection and start the server!
