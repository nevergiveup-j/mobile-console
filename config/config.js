
export default {
	port: process.env.PORT || 3002,
  socketPort: 3003,
  cookieSecret: 'mobileConsole',
	mongodb: {
    host: '192.168.9.37:27018',
    db: '/console'
  }
}