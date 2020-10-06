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




// find list examination by name patient of body temp
router.get("/list/bodyt/:Name", (req, res) => {

  const _Name=req.params.Name
  const agg =[
    {
     $match: { user_name_patient: _Name,"body_temperature_patient": { $exists: true,$ne: null},
     "date_add": { $exists: true,$ne: null},"time_add": { $exists: true,$ne: null},'_id': -1 }
    }
    ]

  Examination.aggregate(agg).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

/*
router.get('/findlist/bodytemp/:Name', (req, res) => {
  const  user_name  = req.params.Name
  const auth =[
    {
      $match: { user_name_patient: user_name ,"body_temperature_patient": { $exists: true,$ne: null}}
  }]
  
  Examination.aggregate(auth).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });        
  }
)
*/

// find list examination by name patient of blood pressure
router.get("/list/bloodp/:Name", (req, res) => {

  const _Name=req.params.Name
  const agg =[
    {
      $match: { user_name_patient: _Name,"systolic_blood_pressure_patient": { $exists: true,$ne: null}
      ,"diastolic_blood_pressure_patient": { $exists: true,$ne: null},
      "date_add": { $exists: true,$ne: null},"time_add": { $exists: true,$ne: null}
      }
    }
    ]

  Examination.aggregate(agg).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});


// find list examination by name patient of heart rate
router.get("/list/heartr/:Name", (req, res) => {

  const _Name=req.params.Name
  const agg =[
    {
     $match: { user_name_patient: _Name,"heart_rate_patient": { $exists: true,$ne: null},
     "date_add": { $exists: true,$ne: null},"time_add": { $exists: true,$ne: null}}
    }
    ]

  Examination.aggregate(agg).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// find list examination by name patient of weight
router.get("/list/weight/:Name", (req, res) => {

  const _Name=req.params.Name
  const agg =[
    {
     $match: { user_name_patient: _Name,"weight_patient": { $exists: true,$ne: null},
     "date_add": { $exists: true,$ne: null},"time_add": { $exists: true,$ne: null}}
    }
    ]

  Examination.aggregate(agg).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// find list examination by name patient of height
router.get("/list/height/:Name", (req, res) => {

  const _Name=req.params.Name
  const agg =[
    {
     $match: { user_name_patient: _Name,"height_patient": { $exists: true,$ne: null},
     "date_add": { $exists: true,$ne: null},"time_add": { $exists: true,$ne: null}}
    }
    ]

  Examination.aggregate(agg).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// find list examination by name patient of glucose
router.get("/list/glucose/:Name", (req, res) => {

  const _Name=req.params.Name
  const agg =[
    {
     $match: { user_name_patient: _Name,"glucose_patient": { $exists: true,$ne: null},
     "date_add": { $exists: true,$ne: null},"time_add": { $exists: true,$ne: null}}
    }
    ]

  Examination.aggregate(agg).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

module.exports = router;
