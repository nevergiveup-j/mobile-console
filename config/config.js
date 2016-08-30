
module.exports = {
	port: process.env.PORT || 3002,
  cookieSecret: 'mobileConsole',
	mongodb: {
    host: 'localhost/',
    db: 'mobileConsole',
    port: '',
    username: 'admin',
    password: 'admin'
  }
}