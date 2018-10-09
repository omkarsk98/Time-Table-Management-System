const express = require("express");
const router = express.Router();
const Mail = require("../modules/mailerModule");

router.post("/", function(req, res, next) {
  if (!req.body.email) res.status(200).send("email required");

  let otp = Math.floor(Math.random() * (999998 - 111111 + 1) + 1);
  let mail = new Mail({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "timetablesystem.muj@gmail.com",
      pass: "tmsproject!"
    }
  });
  mail
    .sendMail({
      to: req.body.email,
      subject: "OTP Confirmation",
      text: "Please check your otp",
      html: `<p>We received your request for signup. Your OTP is ${otp}</p>`
    })
    .then(() => {
      res.status(200).json({ otp: otp, message: "OTP sent" });
      console.log(otp);
    })
    .catch();
});

module.exports = router;
