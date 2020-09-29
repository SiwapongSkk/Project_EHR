// examination patient.model.js

var mongoose = require("mongoose");

var examinationSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
    
    id_data_update_patient: {
      type: String
    },
    user_name_patient: {
      type: String,
    },
    id_patient: {
      type: String
    },
    date_of_update_patient: { 
      type: Date
    },
    weight_patient: {
        type: String
    },
    height_patient: {
        type: Number
    },
    heart_rate_patient: {
        type: Number
    },
    systolic_blood_pressure_patient: {
        type: Number
    },
    diastolic_blood_pressure_patient: {
        type: Number
    },
    body_temperature_patient: {
        type: Number
    },
    status_patient: {
      type: String
    }

  },
  {
    timestamps: true,
  }
);

// ถ้าไม่ได้กำหนด collection ข้างบน default จะเป็น "foods"
var Examination = mongoose.model("Examination", examinationSchema);
module.exports = Examination;