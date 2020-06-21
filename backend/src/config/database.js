module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'root',
  database: 'database',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}