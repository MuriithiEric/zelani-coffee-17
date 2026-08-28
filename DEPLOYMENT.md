# cPanel Deployment & Migration Guide: NestJS + Prisma Backend

This document details the process for deploying the NestJS API backend to a standard cPanel hosting environment and migrating existing database schema/data and files from Supabase.

---

## 1. Prerequisites & cPanel Configuration

### Database Setup
1. **Create PostgreSQL Database**:
   * Navigate to **cPanel** > **PostgreSQL Databases**.
   * Under **Create New Database**, enter `zelani_coffee_db` and click **Create Database**.
2. **Create Database User**:
   * Under **PostgreSQL Users** > **Add New User**, enter a username (e.g., `zelani_user`) and a secure password.
   * Click **Create User**. Note these credentials.
3. **Grant Privileges**:
   * Under **Add User to Database**, select your user and database. Click **Add**.
   * Ensure all privileges are assigned.
4. **Database Connection URL**:
   * Your connection string format will be:
     ```env
     DATABASE_URL="postgresql://zelani_user:PASSWORD@127.0.0.1:5432/zelani_coffee_db"
     ```
   * *Note:* If PostgreSQL is hosted on the same server, `127.0.0.1` or `localhost` is correct.

### Storage Directory Setup
1. Open cPanel **File Manager**.
2. Navigate to your home directory `/home/CPANEL_USER/`.
3. Create a folder named `storage` at `/home/CPANEL_USER/storage` (outside of the public HTML and your node application directory).
4. Create the required subdirectories:
   ```text
   storage/
   ├── profiles/
   ├── documents/
   ├── images/
   ├── attachments/
   ├── products/
   └── temporary/
   ```

---

## 2. Deploying the NestJS Backend

1. **Upload Project**:
   * Compress the `nest-api` directory (exclude `node_modules` and `dist` folders).
   * Upload the ZIP to `/home/CPANEL_USER/nest-api` using cPanel File Manager and extract it.
2. **Setup Node.js App in cPanel**:
   * Search for **Setup Node.js App** or **Node.js Application Manager** in cPanel.
   * Click **Create Application**.
   * Set **Node.js Version** to 18 or higher (e.g., v20).
   * Set **Application Mode** to `production`.
   * Set **Application Root** to `nest-api`.
   * Set **Application URL** to your target domain/subdomain (e.g., `api.example.com`).
   * Set **Application Startup File** to `app.js`.
3. **Add Environment Variables**:
   * Under the Node.js application settings in cPanel, add the variables defined in `.env.example`:
     * `NODE_ENV=production`
     * `DATABASE_URL=postgresql://zelani_user:PASSWORD@127.0.0.1:5432/zelani_coffee_db`
     * `JWT_SECRET=YOUR_SECURE_JWT_SECRET`
     * `JWT_REFRESH_SECRET=YOUR_SECURE_REFRESH_JWT_SECRET`
     * `STORAGE_PATH=/home/CPANEL_USER/storage`
     * `FRONTEND_URL=https://your-frontend-domain.com`
     * `DHL_USERNAME=dhl_username`
     * `DHL_PASSWORD=dhl_password`
4. **Install Dependencies & Compile**:
   * Enter the virtual environment command displayed at the top of the Setup Node.js App page in your terminal (SSH):
     ```bash
     source /home/CPANEL_USER/nodevenv/nest-api/20/bin/activate && cd /home/CPANEL_USER/nest-api
     ```
   * Install npm dependencies:
     ```bash
     npm install
     ```
   * Generate Prisma Client:
     ```bash
     npm run prisma:generate
     ```
   * Run Database Migrations:
     ```bash
     npm run prisma:migrate
     ```
   * Compile the application:
     ```bash
     npm run build
     ```
5. **Start / Restart Application**:
   * In cPanel **Setup Node.js App**, click **Start** or **Restart Application** to reload Passenger and launch the server.

---

## 3. Migration Strategy (Supabase to cPanel)

### Database Migration
To migrate your existing data from Supabase PostgreSQL to cPanel PostgreSQL:
1. **Export from Supabase**:
   * Run `pg_dump` on your Supabase connection string:
     ```bash
     pg_dump -h db.fgspweyczhcillxpyiiq.supabase.co -U postgres -d postgres --clean --no-owner --no-privileges -f supabase_backup.sql
     ```
2. **Import to cPanel**:
   * Open cPanel **phpPgAdmin** or run via SSH:
     ```bash
     psql -U zelani_user -d zelani_coffee_db -f supabase_backup.sql
     ```
   * *Note:* Ensure you apply Prisma migrations (`npm run prisma:migrate`) prior to importing user tables if you are setting up local `users` schema.

### Files / Objects Migration
If files exist in Supabase storage buckets:
1. **Download files**:
   * Use the Supabase CLI or write a simple script to pull all files from your storage buckets.
2. **Upload to cPanel Storage**:
   * Transfer the downloaded structures into `/home/CPANEL_USER/storage/` matching their folders (e.g., profile pictures to `/home/CPANEL_USER/storage/profiles`).
3. **Register Metadata**:
   * For any existing uploaded files, insert corresponding record entries into the new `File` metadata database table mapping their exact relative paths.

---

## 4. Backups Strategy

A database backup does **NOT** contain physical files stored on the filesystem. Both must be backed up independently.

### PostgreSQL Database Backup
Create a cron job in cPanel to run nightly backups:
```bash
pg_dump -U zelani_user -d zelani_coffee_db -f /home/CPANEL_USER/backups/db_$(date +\%F).sql
```

### Storage Files Backup
Create a cron job or script to archive the storage directory:
```bash
tar -czf /home/CPANEL_USER/backups/files_$(date +\%F).tar.gz /home/CPANEL_USER/storage
```
