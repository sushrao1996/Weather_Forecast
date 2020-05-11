const sequelize = require("sequelize");
const StudentDB = new sequelize(process.env.DB_URL);

StudentDB.authenticate()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch(err => {
    console.log("Connection failed");
    console.error(err);
  });
module.exports = StudentDB;
