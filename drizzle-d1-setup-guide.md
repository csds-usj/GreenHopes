# Drizzle ORM + Cloudflare D1/R2 Setup Guide

## Prerequisites
- Wrangler CLI installed and logged in
- React Router project with shadcn + TailwindCSS
- Drizzle ORM installed

## Step 1: Configure Wrangler and Create D1 Database

### 1.1 Create wrangler.toml
Create a `wrangler.toml` file in your project root:

```toml
name = "green-hopes-app"
compatibility_date = "2024-01-15"

[[ d1_databases ]]
binding = "DB"
database_name = "green-hopes-db"
database_id = "your-database-id-will-be-here"

[[ r2_buckets ]]
binding = "R2"
bucket_name = "green-hopes-images"
```

### 1.2 Create D1 Database
```bash
# Create the D1 database
npx wrangler d1 create green-hopes-db

# Copy the database_id from the output and update wrangler.toml
```

### 1.3 Create R2 Bucket
```bash
# Create R2 bucket for images
npx wrangler r2 bucket create green-hopes-images
```

## Step 2: Configure Drizzle

### 2.1 Install Additional Dependencies
```bash
npm install drizzle-kit @cloudflare/workers-types
npm install -D @types/node
```

### 2.2 Create drizzle.config.ts
Create `drizzle.config.ts` in your project root:

```typescript
import type { Config } from 'drizzle-kit';

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  driver: 'd1',
  dbCredentials: {
    wranglerConfigPath: './wrangler.toml',
    dbName: 'green-hopes-db',
  },
} satisfies Config;
```

### 2.3 Update package.json Scripts
Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate:sqlite",
    "db:migrate": "npx wrangler d1 migrations apply green-hopes-db --local",
    "db:migrate:prod": "npx wrangler d1 migrations apply green-hopes-db",
    "db:studio": "drizzle-kit studio",
    "db:push": "drizzle-kit push:sqlite"
  }
}
```

## Step 3: Create Database Schema

### 3.1 Create drizzle/schema.ts
```typescript
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const trees = sqliteTable('trees', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  number: integer('number').notNull(), // Original tree number
  name: text('name').notNull(), // Temporary/common name
  scientificName: text('scientific_name'),
  group: text('group'),
  family: text('family'),
  descriptionMd: text('description_md'), // Markdown description
  imageUrl: text('image_url'), // R2 URL
  category: text('category', {
    enum: ['native', 'endemic', 'exotic', 'poisonous'],
  }).notNull(),
});
```

## Step 4: Generate and Apply Migrations

```bash
# Generate migration files
npm run db:generate

# Apply migrations locally (for development)
npm run db:migrate

# Apply migrations to production (when ready)
npm run db:migrate:prod
```

## Step 5: CSV Import Script

### 5.1 Create scripts/import-data.ts
```typescript
import { drizzle } from 'drizzle-orm/d1';
import { trees } from '../drizzle/schema';
import * as fs from 'fs';
import * as path from 'path';
import Papa from 'papaparse';

// Types
interface PlantData {
  number: string;
  name: string;
  scientificName: string;
  group: string;
  family: string;
  descriptionMd: string;
  category: 'native' | 'endemic' | 'exotic' | 'poisonous';
}

// Configuration
const CSV_FILE_PATH = './data/plants.csv';
const IMAGES_FOLDER = './images';
const R2_BUCKET_URL = 'https://your-r2-bucket.your-account.r2.cloudflarestorage.com';

async function uploadImageToR2(imagePath: string, scientificName: string): Promise<string> {
  const imageFileName = `${scientificName.toLowerCase().replace(/\s+/g, '-')}.webp`;
  
  // Using wrangler to upload to R2
  const { execSync } = require('child_process');
  
  try {
    execSync(`npx wrangler r2 object put green-hopes-images/${imageFileName} --file=${imagePath}`, {
      stdio: 'inherit'
    });
    
    return `${R2_BUCKET_URL}/${imageFileName}`;
  } catch (error) {
    console.error(`Failed to upload ${imageFileName}:`, error);
    return '';
  }
}

async function findImageForPlant(scientificName: string): Promise<string | null> {
  const possibleNames = [
    scientificName.toLowerCase().replace(/\s+/g, '-'),
    scientificName.toLowerCase().replace(/\s+/g, '_'),
    scientificName.toLowerCase().replace(/\s+/g, ''),
  ];
  
  for (const name of possibleNames) {
    const imagePath = path.join(IMAGES_FOLDER, `${name}.webp`);
    if (fs.existsSync(imagePath)) {
      return imagePath;
    }
  }
  
  return null;
}

async function importData() {
  // Read CSV file
  const csvContent = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
  
  // Parse CSV
  const { data } = Papa.parse<PlantData>(csvContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => {
      // Transform CSV headers to match your schema
      const headerMap: { [key: string]: string } = {
        'Number': 'number',
        'Name': 'name',
        'Scientific Name': 'scientificName',
        'Group': 'group',
        'Family': 'family',
        'Description': 'descriptionMd',
        'Category': 'category',
      };
      return headerMap[header] || header;
    }
  });

  console.log(`Found ${data.length} plants to import`);

  // Create a temporary D1 database connection for local testing
  // Note: For production, you'll need to adapt this to work with your deployment setup
  
  const plantsToInsert = [];

  for (const plant of data) {
    console.log(`Processing: ${plant.name} (${plant.scientificName})`);
    
    let imageUrl = '';
    
    // Find and upload image if it exists
    if (plant.scientificName) {
      const imagePath = await findImageForPlant(plant.scientificName);
      if (imagePath) {
        console.log(`Found image: ${imagePath}`);
        imageUrl = await uploadImageToR2(imagePath, plant.scientificName);
        console.log(`Uploaded to: ${imageUrl}`);
      } else {
        console.log(`No image found for: ${plant.scientificName}`);
      }
    }
    
    plantsToInsert.push({
      number: parseInt(plant.number) || 0,
      name: plant.name,
      scientificName: plant.scientificName,
      group: plant.group,
      family: plant.family,
      descriptionMd: plant.descriptionMd,
      imageUrl,
      category: plant.category,
    });
  }

  // Save the processed data to a JSON file that can be used with wrangler
  fs.writeFileSync('./data/processed-plants.json', JSON.stringify(plantsToInsert, null, 2));
  
  console.log('Data processing complete! Check processed-plants.json');
  console.log('Next step: Use the D1 import script to insert data into the database');
}

// Run the import
importData().catch(console.error);
```

### 5.2 Create scripts/insert-to-d1.ts
```typescript
// This script uses wrangler to insert data into D1
import * as fs from 'fs';

async function insertToD1() {
  const plantsData = JSON.parse(fs.readFileSync('./data/processed-plants.json', 'utf-8'));
  
  // Create SQL insert statements
  const insertStatements = plantsData.map((plant: any) => {
    const values = [
      plant.number,
      `'${plant.name.replace(/'/g, "''")}'`,
      plant.scientificName ? `'${plant.scientificName.replace(/'/g, "''")}'` : 'NULL',
      plant.group ? `'${plant.group.replace(/'/g, "''")}'` : 'NULL',
      plant.family ? `'${plant.family.replace(/'/g, "''")}'` : 'NULL',
      plant.descriptionMd ? `'${plant.descriptionMd.replace(/'/g, "''")}'` : 'NULL',
      plant.imageUrl ? `'${plant.imageUrl}'` : 'NULL',
      `'${plant.category}'`
    ];
    
    return `INSERT INTO trees (number, name, scientific_name, "group", family, description_md, image_url, category) VALUES (${values.join(', ')});`;
  });
  
  // Write SQL file
  const sqlContent = insertStatements.join('\n');
  fs.writeFileSync('./data/insert-plants.sql', sqlContent);
  
  console.log('SQL file created: ./data/insert-plants.sql');
  console.log('Run the following command to insert data:');
  console.log('npx wrangler d1 execute green-hopes-db --file=./data/insert-plants.sql');
}

insertToD1().catch(console.error);
```

### 5.3 Install Script Dependencies
```bash
npm install papaparse @types/papaparse
```

## Step 6: Project Structure Setup

Create the following folder structure:
```
your-project/
├── drizzle/
│   ├── schema.ts
│   └── migrations/ (generated)
├── scripts/
│   ├── import-data.ts
│   └── insert-to-d1.ts
├── data/
│   └── plants.csv (your CSV file)
├── images/
│   └── (your .webp images named by scientific name)
├── drizzle.config.ts
└── wrangler.toml
```

## Step 7: Running the Import Process

1. **Prepare your data:**
   ```bash
   # Make sure your CSV has the correct headers:
   # Number,Name,Scientific Name,Group,Family,Description,Category
   ```

2. **Process CSV and upload images:**
   ```bash
   npx tsx scripts/import-data.ts
   ```

3. **Generate SQL and insert to D1:**
   ```bash
   npx tsx scripts/insert-to-d1.ts
   npx wrangler d1 execute green-hopes-db --file=./data/insert-plants.sql
   ```

4. **Verify the data:**
   ```bash
   npx wrangler d1 execute green-hopes-db --command="SELECT COUNT(*) FROM trees;"
   ```

## Step 8: Using in Your React App

### 8.1 Create lib/db.ts
```typescript
import { drizzle } from 'drizzle-orm/d1';
import { trees } from '../drizzle/schema';

// This will be available in your Cloudflare Workers environment
export function getDb(env: { DB: D1Database }) {
  return drizzle(env.DB);
}

// Example query function
export async function getAllTrees(db: ReturnType<typeof getDb>) {
  return await db.select().from(trees);
}

export async function getTreeById(db: ReturnType<typeof getDb>, id: number) {
  return await db.select().from(trees).where(eq(trees.id, id));
}
```

## Notes

- Replace `your-database-id-will-be-here` in wrangler.toml with the actual database ID from step 1.2
- Update the R2_BUCKET_URL in the import script with your actual R2 bucket URL
- Ensure your CSV headers match the expected format
- Images should be named using the scientific name (lowercase, spaces replaced with hyphens)
- Test locally first using `--local` flag with wrangler commands

## Troubleshooting

- If migrations fail, check that wrangler.toml is correctly configured
- For R2 upload issues, verify bucket permissions and wrangler authentication
- If CSV parsing fails, check for special characters and encoding (use UTF-8)
- For large datasets, consider batch processing to avoid timeouts