module.exports = {
    jwt: {
        secret: 'myapp',
        options: {
          algorithm: 'HS256',
          expiresIn: '10m'
        }
    },
    saltRounds: 10
}