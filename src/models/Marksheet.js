const Sequelize = require("sequelize");

const StudentDB = require("../config/StudentDB");

const Students = require("./Students");

const Marksheet = StudentDB.define("marks", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  subject: {
    type: Sequelize.ENUM,
    values: ["science", "maths", "french", "english", "tamil"]
  },
  mark: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
Marksheet.belongsTo(Students, { foreignKey: "student_id" });
const Marklist = [
  { student_id: 1, subject: "science", mark: 80 },
  { student_id: 1, subject: "maths", mark: 90 },
  { student_id: 1, subject: "french", mark: 85 },
  { student_id: 1, subject: "english", mark: 85 },
  { student_id: 1, subject: "tamil", mark: 85 },

  { student_id: 2, subject: "science", mark: 82 },
  { student_id: 2, subject: "maths", mark: 77 },
  { student_id: 2, subject: "french", mark: 65 },
  { student_id: 2, subject: "english", mark: 77 },
  { student_id: 2, subject: "tamil", mark: 65 },

  { student_id: 3, subject: "science", mark: 50 },
  { student_id: 3, subject: "maths", mark: 98 },
  { student_id: 3, subject: "french", mark: 81 },
  { student_id: 3, subject: "english", mark: 98 },
  { student_id: 3, subject: "tamil", mark: 81 },

  { student_id: 4, subject: "science", mark: 40 },
  { student_id: 4, subject: "maths", mark: 56 },
  { student_id: 4, subject: "french", mark: 87 },
  { student_id: 4, subject: "english", mark: 56 },
  { student_id: 4, subject: "tamil", mark: 87 }
];

Marksheet.sync({ forced: true })
  .then(() => {
    return Marksheet.bulkCreate(Marklist, { returning: true });
  })
  .then(result => {
    result.forEach(item => console.log(item.get()));
  })
  .catch(console.error);
