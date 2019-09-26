const sgEmail = require("@sendgrid/mail");
const sendGridAPIKey = "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";
sgEmail.setApiKey(sendGridAPIKey);

const send_verication_email = function(userEmail, userName, verificationCode) {
    sgEmail.send({
        to: userEmail,
        from: "donot_reply@patrick_server.heroku.com",
        subject: "Please confirm your email address",
        text: `Hi ${userName}, your verification code is: ${verificationCode}`
    });
}

module.exports = {
    send_verication_email: send_verication_email
}