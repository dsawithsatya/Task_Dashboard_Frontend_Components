const fs = require('fs');
const mysql = require('mysql2/promise');

(async () => {
  try {
    const sql = fs.readFileSync(__dirname + '/../sql/schema.sql', 'utf8');
    const config = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true,
    };
    console.log('Connecting with', config.user, 'to', config.host);
    const conn = await mysql.createConnection(config);

    // Split by ; followed by newline to avoid breaking statements inside definitions
    const parts = sql.split(/;\s*\n/).map(s => s.trim()).filter(Boolean);
    for (const p of parts) {
      try {
        console.log('Executing:', p.split('\n')[0].slice(0, 120));
        await conn.query(p);
      } catch (e) {
        console.error('Statement error:', e.message);
      }
    }

    await conn.end();
    console.log('Schema applied');
  } catch (e) {
    console.error('Fatal error', e);
    process.exit(1);
  }
})();
