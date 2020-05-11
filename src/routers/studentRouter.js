const express = require("express");
const studentRouter = express.Router();
const StudentDB = require("../config/StudentDB");
const { QueryTypes } = require("sequelize");
const Students = require("../models/Students");

studentRouter.get("/", async (req, res) => {
  var studentsList = [];
  await Students.findAll().then(response => {
    response.forEach(Student => studentsList.push(Student.get()));
  });

  var topScorer;

  await StudentDB.query(
    "select concat(first_name,' ',last_name)as name,subject,mark from students s inner join (select student_id,subject,mark from marks where (subject,mark) in (select subject,max(mark) as mark from marks group by subject order by subject desc) order by student_id) m on s.id=m.student_id",
    {
      type: QueryTypes.SELECT
    }
  ).then(response => {
    topScorer = response;
  });

  var OverallTopScorer;

  await StudentDB.query(
    "select concat(first_name,' ',last_name) as name,total from students s inner join (select student_id,sum(mark) as total from marks group by student_id order by 2 desc limit 1)m on m.student_id=s.id",
    {
      type: QueryTypes.SELECT
    }
  ).then(response => {
    OverallTopScorer = response;
  });

  var avgscores;

  await StudentDB.query(
    "select subject,round(avg(mark),2) as average from marks group by subject",
    { type: QueryTypes.SELECT }
  ).then(response => {
    avgscores = response;
  });

  var below35;
  await StudentDB.query(
    "select subject,count(student_id) from marks where mark<35 group by subject",
    { type: QueryTypes.SELECT }
  ).then(response => {
    below35 = response;
  });

  var studentmarks;

  await StudentDB.query(
    "select concat(first_name, ' ', last_name) as name, array_agg(distinct m.subject) as subjects, array_agg(m.mark) as mark from students s join marks m on s.id=m.student_id group by 1",
    { type: QueryTypes.SELECT }
  ).then(response => {
    studentmarks = response;
  });

  res.render("studentpage", {
    layout: "navigation",
    mode: "students",
    studentsList,
    topScorer,
    OverallTopScorer,
    avgscores,
    below35,
    studentmarks
  });
});

module.exports = studentRouter;
