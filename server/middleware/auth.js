var jwt = require('jsonwebtoken')

const { jwtSecret } = require('../config/config')

module.exports = {
  isLoggedIn: (request, response, next) => {
    try {
        let token = request.headers.authorization?.split(' ')[1]
        request.user = jwt.verify(token, jwtSecret)
        next()
    } catch (error) {
        console.log(error)
        return response.status(401).send({ error: 'Invalid authorization token'})
    }
  },
};
