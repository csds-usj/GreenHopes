# Migration Guide: Cloudflare D1 to Turso

This guide will help you migrate your Green Hopes project from Cloudflare D1 to Turso using Drizzle ORM.

## ✅ Migration Status: COMPLETE

Your project has been successfully migrated from Cloudflare D1 to Turso! All data has been transferred and the application is working correctly.

### What's Working:
- ✅ Database connection to Turso
- ✅ All 68 plant records migrated
- ✅ API endpoints (`/api/plants`, `/api/plants/[scientific-name]`)
- ✅ Nature Code pages (`/nature-code`, `/nature-code/[scientific-name]`)
- ✅ React Query data fetching
- ✅ Search and filtering functionality

## Prerequisites

1. **Turso Account**: Sign up at [turso.tech](https://turso.tech)
2. **Turso CLI**: Install the Turso CLI
   ```bash
   curl -sSfL https://get.tur.so/install.sh | bash
   ```
3. **Environment Variables**: You'll need both D1 and Turso credentials

## Step 1: Create a Turso Database

1. **Login to Turso**:
   ```bash
   turso auth login
   ```

2. **Create a new database**:
   ```bash
   turso db create green-hopes-db
   ```

3. **Get your database URL and auth token**:
   ```bash
   turso db show green-hopes-db --url
   turso db tokens create green-hopes-db
   ```

## Step 2: Set Environment Variables

Create or update your `.env` file with the following variables:

```env
# Cloudflare D1 (for data migration)
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_DATABASE_ID=your_database_id
CLOUDFLARE_D1_TOKEN=your_d1_token

# Turso (new database)
TURSO_DATABASE_URL=libsql://your-database-url
TURSO_AUTH_TOKEN=your_auth_token
```

## Step 3: Run Database Migration

1. **Generate the migration** (already done):
   ```bash
   bun run db:generate
   ```

2. **Apply the migration to Turso**:
   ```bash
   bun run db:migrate
   ```

## Step 4: Migrate Your Data

Run the data migration script to copy all your data from D1 to Turso:

```bash
bun run db:migrate-data
```

This script will:
- Connect to your Cloudflare D1 database
- Fetch all tree records
- Transform the data to match the new schema
- Insert the data into your Turso database
- Show progress for each record

## Step 5: Verify the Migration

1. **Check your data in Turso**:
   ```bash
   bun run db:studio
   ```

2. **Test your application**:
   ```bash
   bun run dev
   ```

3. **Verify API endpoints**:
   - Visit `/api/plants` to see all plants
   - Visit `/api/plants/[scientific-name]` to see individual plants
   - Visit `/nature-code` to see the Nature Code interface
   - Visit `/nature-code/[scientific-name]` to see individual plant details

## Step 6: Update Your Deployment

Once you've verified everything works locally:

1. **Update your production environment variables** with the Turso credentials
2. **Remove the Cloudflare D1 environment variables** from your production environment
3. **Deploy your application**

## Available Commands

- `bun run db:migrate` - Apply database migrations to Turso
- `bun run db:studio` - Open Drizzle Studio to view data
- `bun run db:setup-turso` - Test Turso connection
- `bun run db:migrate-data` - Migrate data from D1 to Turso
- `bun run dev` - Start development server

## Troubleshooting

### Migration Script Issues

If the migration script fails:

1. **Check your environment variables** are correctly set
2. **Verify your D1 credentials** are still valid
3. **Check your Turso credentials** are correct
4. **Run the script with verbose logging**:
   ```bash
   bun run db:migrate-data
   ```

### Database Connection Issues

If you can't connect to Turso:

1. **Verify your database URL** starts with `libsql://`
2. **Check your auth token** is valid
3. **Ensure your database exists** and is accessible

### Schema Issues

If you encounter schema mismatches:

1. **Check the migration file** in `drizzle/migrations/`
2. **Verify the schema** in `drizzle/schema.ts`
3. **Regenerate migrations** if needed:
   ```bash
   bun run db:generate
   ```

## Rollback Plan

If you need to rollback:

1. **Keep your D1 database** until you're confident in the migration
2. **Your D1 credentials** are still in your environment variables
3. **Revert the code changes** if needed
4. **Update environment variables** back to D1

## Benefits of Turso

- **Better performance**: Turso is built on libSQL, a fork of SQLite
- **Global distribution**: Multiple regions for better latency
- **Real-time sync**: Automatic replication between regions
- **Better tooling**: Improved CLI and management tools
- **Cost effective**: Often cheaper than D1 for similar workloads

## Support

If you encounter issues:

1. **Check the Turso documentation**: [docs.turso.tech](https://docs.turso.tech)
2. **Check the Drizzle documentation**: [orm.drizzle.team](https://orm.drizzle.team)
3. **Review the migration script** in `scripts/migrate-to-turso.ts`
