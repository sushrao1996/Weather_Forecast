const Sequelize = require("sequelize");

const StudentDB = require("../config/StudentDB");

const Students = StudentDB.define("students", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: Sequelize.STRING,
    field: "first_name",
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    field: "last_name",
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  gender: {
    type: Sequelize.ENUM,
    values: ["Male", "Female"]
  }
});

// const studentData = [
//   {
//     firstName: "Sush",
//     lastName: "Mavilla",
//     age: 23,
//     gender: "Female"
//   },
//   {
//     firstName: "Arjun",
//     lastName: "Mavilla",
//     age: 26,
//     gender: "Male"
//   },
//   {
//     firstName: "Rama",
//     lastName: "Devi",
//     age: 25,
//     gender: "Female"
//   },
//   {
//     firstName: "Nagesh",
//     lastName: "Rao",
//     age: 24,
//     gender: "Male"
//   }
// ];
// const newStudent = {
//   firstName: "Sush",
//   lastName: "Mavilla",
//   age: 23,
//   Subject: "English"
// };
// Student.sync({ forced: false })
//   .then(() => {
//     console.log("table created");
//     return Student.create(newStudent);
//   })
//   .then(result => {
//     console.log(result.get());
//   })
//   .catch(console.error);

// Student.findOne({
//   where: {
//     age: 23
//   }
// })
//   .then(teacherInstance => {
//     console.log(teacherInstance.get());
//   })
//   .catch(console.error);

// Students.sync({ forced: true })
//   .then(() => {
//     return Students.bulkCreate(studentData, { returning: true });
//   })
//   .then(result => {
//     result.forEach(item => console.log(item.get()));
//   })
//   .catch(console.error);

module.exports = Students;
