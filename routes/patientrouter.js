// patientrouter.js

var express = require("express");
var router = express.Router();
var Patient = require("../models/patientmodel");

// GET all
router.get("/", (req, res) => {
    Patient.find().exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// GET 1
router.get("/:_id", (req, res) => {
    Patient.findById(req.params._id).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// POST (create new data)
router.post("/", (req, res) => {
  var obj = new Patient(req.body);
  obj.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// PUT (update current data)
router.put("/:_id", (req, res) => {
    Patient.findByIdAndUpdate(req.params._id, req.body, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("อัพเดทข้อมูลเรียบร้อย");
  });
});

// DELETE (delete 1 data)
router.delete("/:_id", (req, res) => {
    Patient.findByIdAndDelete(req.params._id, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("ลบข้อมูลเรียบร้อย");
  });
});

// Update ครั้งที่ 2 การดีงค่า api แบบเจาะจง
// find name patient
router.get("/name/:Name", (req, res) => {

  const _Name=req.params.Name
  const agg =[
    {
      $match: { user_name_patient: _Name }
  }]

  Patient.aggregate(agg).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});




module.exports = router;