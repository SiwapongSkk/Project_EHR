// patientrouter.js

var express = require("express");
var router = express.Router();
var Patient = require("../models/patientmodel");


router.post('/register', async (req, res) => {
    const { user_name_patient, password_patient, name_patient } = req.body

    // simple validation
    if (!user_name_patient || !password_patient || !name_patient) {
      return res.send("ห้ามเว้นว่าง");
    }

   /* const passwordHash = bcrypt.hashSync(password_patient, 10)*/

    const auth = new Patient({
        name_patient,
      user_name_patient,
      password_patient
    })
    await auth.save()
    res.status(200).send("สมัครสมาชิกระบบเรียบร้อย ----- 111"+auth);
  })



  router.post('/login', async (req, res) => {
    const { user_name_patient, password_patient } = req.body

    const auth = await Patient.findOne({
        user_name_patient,
        password_patient
    })

        /*
        //เปรียบเทียบผ่านการเข้ารหัส
        if (auth) {
            const isCorrect = bcrypt.compareSync(password_patient, auth.password_patient)
        */

        //เช็ค
        if (auth) {

        return res.status(200).send("เข้าสู่ระบบเรียบร้อย ----- 111"+auth);

        } else {
        return res.status(400).send("เข้าสู่ระบบไม่ได้ -----000");

        }
        }
    
  )


module.exports = router;