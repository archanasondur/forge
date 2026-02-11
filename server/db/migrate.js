import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query, testConnection } from './connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to run migrations
export const runMigrations = async () => {
  try {
    console.log('🔄 Running database migrations...');
    
    // Test connection first
    const connectionSuccess = await testConnection();
    if (!connectionSuccess) {
      throw new Error('Database connection failed');
    }

    // Read migration files
    const migrationsDir = path.join(__dirname, 'migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    console.log(`Found ${migrationFiles.length} migration file(s)`);

    // Run each migration
    for (const file of migrationFiles) {
      console.log(`Running migration: ${file}`);
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      await query(sql);
      console.log(`✅ Migration ${file} completed successfully`);
    }

    console.log('🎉 All migrations completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
};

// Run migrations if this file is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  (async () => {
    try {
      await runMigrations();
      console.log('✅ Database setup completed successfully!');
      process.exit(0);
    } catch (error) {
      console.error('Setup failed:', error);
      process.exit(1);
    }
  })();
} 