
export default {
	port: process.env.PORT || 3002,
  socketPort: 3003,
  cookieSecret: 'mobileConsole',
	mongodb: {
    host: 'localhost/',
    db: 'mobileConsole',
    port: '',
    username: 'admin',
    password: 'admin'
  }
}