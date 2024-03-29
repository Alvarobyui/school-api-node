/* const mongoose = require('mongoose');
 */
const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
  .then((client) => {
    _db = client;
    callback(null, _db);
  })
  .catch((err) => {
      callback(err);
    });
  };
  
  const getDb = () => {
    if (!_db) {
      throw Error('Db not initialized');
    }
    return _db;
  };
  
  module.exports = {
    initDb,
    getDb
};

    /* main().catch(err=> console.log(err));
    
    
    async function main() {
      await mongoose.connect(process.env.MONGODB_URI);
    }
    
    module.exports = main; */
    
    /* module.exports = () => {
      const connect = () => {
        mongoose.connect(process.env.MONGODB_URI);
    
      }
      connect();
    }
    
     */