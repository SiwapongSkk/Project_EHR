// examinationrouter.js

var express = require("express");
var router = express.Router();
var Examination = require("../models/examinationmodel");

// GET all
router.get("/", (req, res) => {
    Examination.find().exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// GET 1
router.get("/:_id", (req, res) => {
    Examination.findById(req.params._id).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// POST (create new data)
router.post("/", (req, res) => {
  var obj = new Examination(req.body);

  obj.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// PUT (update current data)
router.put("/:_id", (req, res) => {
    Examination.findByIdAndUpdate(req.params._id, req.body, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("อัพเดทข้อมูลเรียบร้อย");
  });
});

// DELETE (delete 1 data)
router.delete("/:_id", (req, res) => {
    Examination.findByIdAndDelete(req.params._id, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("ลบข้อมูลเรียบร้อย");
  });
});


// find examination by name patient
router.get("/name/:Name", (req, res) => {

  const _Name=req.params.Name
  const agg =[
    {
      $match: { user_name_patient: _Name }
  }]

  Examination.aggregate(agg).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});




router.post('/findlist', async (req, res) => {
  const { user_name_patient } = req.body

  const auth = await Examination.find({
      user_name_patient
  })

      /*
      //เปรียบเทียบผ่านการเข้ารหัส
      if (auth) {
          const isCorrect = bcrypt.compareSync(password_patient, auth.password_patient)
      */

      //เช็ค
      
      if (auth) {

      return res.status(200).send(auth);

      } else {
      return res.status(400).send("เข้าสู่ระบบไม่ได้");

      }
      }
  
)

module.exports = router;
