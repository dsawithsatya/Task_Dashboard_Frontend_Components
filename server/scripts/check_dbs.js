const pool = require('../config/db');
(async ()=>{
  try{
    const [db] = await pool.query('SELECT DATABASE() as db');
    console.log('App connected database:', db[0].db);

    const [e] = await pool.query("SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema='ecommerce'");
    console.log('Ecommerce tables:', e.map(r=>r.TABLE_NAME));

    const [t] = await pool.query("SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema='ecommerce'");
    console.log('Ecommerce (taskapp) tables:', t.map(r=>r.TABLE_NAME));

    await pool.end();
  }catch(err){
    console.error('Error:', err.message || err);
    process.exit(1);
  }
})();
