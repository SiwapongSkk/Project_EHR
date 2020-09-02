// doctor.model.js

var mongoose = require("mongoose");

var doctorSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
    //***** */
    id_doctor: {
        type: String,
    },
    user_name_doctor: {
        type: String,
    },
    password_doctor: {
        type: String
    },
    prefix_doctor: {
        type: String
    },
    name_doctor: {
        type: String
    },
    surname_doctor: {
        type: String
    },
    medical_expertise: {
        type: String
    },
    gender_doctor: {
        type: String
    }
  },
  {
    timestamps: true,
  }
);

// ถ้าไม่ได้กำหนด collection ข้างบน default จะเป็น "foods"
var Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
