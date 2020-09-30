// patient.model.js

var mongoose = require("mongoose");

var patientSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
    id_patient: {
      type: String,
    },
    user_name_patient: {
      type: String,
      required: true,
      //unique: true
    },
    password_patient: {
      type: String
    },
    name_patient: {
      type: String
    },
    surname_patient: {
      type: String
    },
    gender_patient: {
      type: String
    },
    prefix_patient: {
      type: String
    },
    current_address_patient: {
      type: String
    },
    district_patient: {
      type: String
    },
    province_patient: {
      type: String
    },
    postal_code_patient: {
      type: Number
    },
    house_number_patient: {
      type: Number
    },
    mobile_phone_number_patient: {
      type: Number
    },
    email_patient: {
      type: String
    },
    congenital_disease_patient: {
      type: String
    },
    allergic_drugs_patient: {
      type: String
    },
    allergic_food_patient: {
      type: String
    },
    diagnosis_patient: {
      type: String
    }
  },
  {
    timestamps: true,
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "Patient"
  }
);

// ถ้าไม่ได้กำหนด collection ข้างบน default จะเป็น "foods"
var Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;