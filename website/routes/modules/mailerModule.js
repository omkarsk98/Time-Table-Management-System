const nodemailer = require('nodemailer');

const Mail = function({ host, port, secure, auth: { user, pass } }) {
    this.mail = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
};

Mail.prototype.sendMail = function({ to, subject, text, html }) {
    return new Promise((resolve, reject) => {
        this.mail.sendMail({ to, subject, text, html }, (err, info) => {
            if(err) reject(err);
            resolve(info);
        });
    });
}

// module.export = function sendMailAsort({to, subject, text = "", html = ""}) {

    
// }

module.exports = Mail;

// Format of transportDetails
// {
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: '<sender's email id>'
//         pass: '<sender's password>'
//     }
// }

// Format of mailOptions
// {
//     to: '<receiver's email ids separated by comma>',
//     subject: '<subjet of the mail>',
//     text: '<text of the mail>',
//     html: '<b>TText to be Sent</b>'
// }
