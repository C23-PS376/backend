export default () => ({
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    passoword: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
});