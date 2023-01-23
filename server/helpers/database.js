var mariadb = require('mariadb')
var { dbConfig } = require('../config/config')

var pool = mariadb.createPool(dbConfig)

module.exports = pool