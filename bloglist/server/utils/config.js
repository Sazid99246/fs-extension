const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

const PORT = process.env.NODE_ENV === 'test' ? 3001 : process.env.PORT

const MONGO_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGO_URI
  : process.env.MONGO_URI

module.exports = { MONGO_URI, PORT }
