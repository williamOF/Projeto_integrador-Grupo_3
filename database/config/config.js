require('dotenv').config()

module.exports = {
    "username": process.env.DBUSER,
    "password": process.env.DBPASS,
    "port": process.env.DBPORT,
    "host": process.env.DBHOST,
    "dialect": process.env.DBDIALECT,
    "database": process.env.DBNAME
  }
