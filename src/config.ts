module.exports = {
  port: 3000,
  host: 'localhost',
  jwt: {
    secret: 'myapp',
    options: {
      algorithm: 'HS256',
      expiresIn: '10m'
      }
  },
  saltRounds: 10
}