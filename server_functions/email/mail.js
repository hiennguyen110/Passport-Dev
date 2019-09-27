const sgEmail = require("@sendgrid/mail");
const sendGridAPIKey = "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";
sgEmail.setApiKey(sendGridAPIKey);

const send_verication_email = function(userEmail, userName, verificationCode) {
    console.log(userEmail);
    console.log(userName);
    console.log(verificationCode);
    sgEmail.send({
        to: userEmail,
        from: "donot_reply@patrick_server.heroku.com",
        subject: "Please confirm your email address",
        text: `Hi ${userName}, your verification code is: ${verificationCode}`
    });
}

// send_verication_email("hdaonguyen95@gmail.com", "root", "1234");

module.exports = {
    send_verication_email: send_verication_email
}