module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "postgrespw",
  DB: "postgres",
  dialect: "postgres",
  port:32768,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
