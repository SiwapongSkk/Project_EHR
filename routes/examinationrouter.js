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

/*---------------------------------------------------------------------------------------------------------*/ 

/*  Refresh home  */ 

// find one SYS DIA
router.post("/refresh/BP",(req,res)=>{
  const { user_name_patient} = req.body
  
  const agg = 
    { user_name_patient: user_name_patient,systolic_blood_pressure_patient: { $exists: true,$ne: null}
    ,diastolic_blood_pressure_patient: { $exists: true,$ne: null} }
    
     
    Examination.findOne(agg).sort({_id:-1}).limit(1).exec((err, data) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(data);
    });

})

// find one Heart Rate
router.post("/refresh/heartrate",(req,res)=>{
  const { user_name_patient} = req.body

  const agg = 
  { user_name_patient: user_name_patient,heart_rate_patient: { $exists: true,$ne: null} }
  
  Examination.findOne(agg).sort({_id:-1}).limit(1).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });

})

// find one Body Temp
router.post("/refresh/temp",(req,res)=>{
  const { user_name_patient} = req.body

  const agg = 
  { user_name_patient: user_name_patient,body_temperature_patient: { $exists: true,$ne: null} }
  
  Examination.findOne(agg).sort({_id:-1}).limit(1).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
  
})

// find one Weight
router.post("/refresh/weight",(req,res)=>{
  const { user_name_patient} = req.body

  const agg = 
  { user_name_patient: user_name_patient,weight_patient: { $exists: true,$ne: null} }
  
  Examination.findOne(agg).sort({_id:-1}).limit(1).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });


})

// find one Height
router.post("/refresh/height",(req,res)=>{
  const { user_name_patient} = req.body

  const agg = 
  { user_name_patient: user_name_patient,height_patient: { $exists: true,$ne: null} }
  
  Examination.findOne(agg).sort({_id:-1}).limit(1).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });

})

// find one Glucose
router.post("/refresh/glucose",(req,res)=>{
  const { user_name_patient} = req.body

  const agg = 
  { user_name_patient: user_name_patient,glucose_patient: { $exists: true,$ne: null} }
  
  Examination.findOne(agg).sort({_id:-1}).limit(1).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });


})


// find one all

router.post("/refresh/all",(req,res)=>{
  const { user_name_patient} = req.body
  
  const agg = [
      {
        $match:{user_name_patient,"glucose_patient": { $exists: true,$ne: null}, 
        "date_add": { $exists: true,$ne: null},"time_add": { $exists: true,$ne: null}
                }
      }, 
        {$sort: {  _id: -1 }},{ $limit : 1 }



    ]
        
    Examination.aggregate(agg).exec((err, data) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(data);
    });
})



/*---------------------------------------------------------------------------------------------------------*/ 


// find list examination by name patient of body temp
router.get("/list/bodyt/:Name", (req, res) => {

  const _Name=req.params.Name
  const agg =[
    {
     $match: { user_name_patient: _Name,"body_temperature_patient": { $exists: true,$ne: null},
     "date_add": { $exists: true,$ne: null},"time_add": { $exists: true,$ne: null} }
    },
    { $sort: {  _id: -1 } }

    ]

  Examination.aggregate(agg).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});


// find list examination by name patient of blood pressure
router.get("/list/bloodp/:Name", (req, res) => {

  const _Name=req.params.Name
  const agg =[
    {
      $match: { user_name_patient: _Name,"systolic_blood_pressure_patient": { $exists: true,$ne: null}
      ,"diastolic_blood_pressure_patient": { $exists: true,$ne: null},
      "date_add": { $exists: true,$ne: null},"time_add": { $exists: true,$ne: null}
      }
    },
    { $sort: {  _id: -1 } }
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
    },
    { $sort: {  _id: -1 } }
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
    },
    { $sort: {  _id: -1 } }
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
    },
    { $sort: {  _id: -1 } }
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
    },
    { $sort: {  _id: -1 } }
    ]

  Examination.aggregate(agg).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

/*---------------------------------------------------------------------------------------------------------*/ 

// find Graph examination by name patient of blood pressure
// เปลี่ยน _id เป็นอย่างอื่นไม่ได้
router.get("/graph/bloodp/:Name", (req, res) => {

  const _Name=req.params.Name
  const agg =[

    {
     $match: { user_name_patient: _Name, "systolic_blood_pressure_patient": { $exists: true,$ne: null},
     "diastolic_blood_pressure_patient": { $exists: true,$ne: null},
     "date_add": { $exists: true,$ne: null}, "time_add": { $exists: true,$ne: null} }
    },
    {
      $group:
        {
          _id: "$date_add",
          avgDatasys: { $avg: "$systolic_blood_pressure_patient" },
          avgDatadia: { $avg: "$diastolic_blood_pressure_patient" },
        }
    },
    { $sort: {  _id: -1 } },{$limit : 7}

    ]

  Examination.aggregate(agg).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// find Graph examination by name patient of body temp
// เปลี่ยน _id เป็นอย่างอื่นไม่ได้
router.get("/graph/bodyt/:Name", (req, res) => {

  const _Name=req.params.Name
  const agg =[

    {
     $match: { user_name_patient: _Name, "body_temperature_patient": { $exists: true,$ne: null},
     "date_add": { $exists: true,$ne: null}, "time_add": { $exists: true,$ne: null} }
    },
    {
      $group:
        {
          _id: "$date_add",
          avgData: { $avg: "$body_temperature_patient" }
        }
    },
    { $sort: {  _id: -1 } },{$limit : 7}

    ]

  Examination.aggregate(agg).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});


// find Graph examination by name patient of heart rate
// เปลี่ยน _id เป็นอย่างอื่นไม่ได้
router.get("/graph/heartr/:Name", (req, res) => {

  const _Name=req.params.Name
  const agg =[

    {
     $match: { user_name_patient: _Name, "heart_rate_patient": { $exists: true,$ne: null},
     "date_add": { $exists: true,$ne: null}, "time_add": { $exists: true,$ne: null} }
    },
    {
      $group:
        {
          _id: "$date_add",
          avgData: { $avg: "$heart_rate_patient" }
        }
    },
    { $sort: {  _id: -1 } },{$limit : 7}

    ]

  Examination.aggregate(agg).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// find Graph examination by name patient of weight
// เปลี่ยน _id เป็นอย่างอื่นไม่ได้
router.get("/graph/weight/:Name", (req, res) => {

  const _Name=req.params.Name
  const agg =[

    {
     $match: { user_name_patient: _Name, "weight_patient": { $exists: true,$ne: null},
     "date_add": { $exists: true,$ne: null}, "time_add": { $exists: true,$ne: null} }
    },
    {
      $group:
        {
          _id: "$date_add",
          avgData: { $avg: "$weight_patient" }
        }
    },
    { $sort: {  _id: -1 } },{$limit : 7}

    ]

  Examination.aggregate(agg).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// find Graph examination by name patient of height
// เปลี่ยน _id เป็นอย่างอื่นไม่ได้
router.get("/graph/height/:Name", (req, res) => {

  const _Name=req.params.Name
  const agg =[

    {
     $match: { user_name_patient: _Name, "height_patient": { $exists: true,$ne: null},
     "date_add": { $exists: true,$ne: null}, "time_add": { $exists: true,$ne: null} }
    },
    {
      $group:
        {
          _id: "$date_add",
          avgData: { $avg: "$height_patient" }
        }
    },
    { $sort: {  _id: -1 } },{$limit : 7}

    ]

  Examination.aggregate(agg).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// find Graph examination by name patient of glucose
// เปลี่ยน _id เป็นอย่างอื่นไม่ได้
router.get("/graph/glucose/:Name", (req, res) => {

  const _Name=req.params.Name
  const agg =[

    {
     $match: { user_name_patient: _Name, "glucose_patient": { $exists: true,$ne: null},
     "date_add": { $exists: true,$ne: null}, "time_add": { $exists: true,$ne: null} }
    },
    {
      $group:
        {
          _id: "$date_add",
          avgData: { $avg: "$glucose_patient" }
        }
    },
    { $sort: {  _id: -1 } },{$limit : 7}

    ]

  Examination.aggregate(agg).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

module.exports = router;
