//Note:
// I have not built security, authentication is a remnant from original build

module.exports = {
  port: process.env.PORT || 8081,
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
};