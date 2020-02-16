const nodemailer = require("nodemailer");

// email.js is a file for sending the email

const notifyUser = (emailData, publishedNews) => {
  const transporter = nodemailer.createTransport({
    service: emailData.service,
    auth: emailData.auth
  });

  const mailOptions = {
    from: emailData.from,
    to: emailData.to,
    subject: emailData.subject,
    text: `${emailData.text}:\n${publishedNews}`,
    html: `${emailData.html}:${publishedNews}`,
    attachments: [
    {
      filename: 'whatismycountry',
      path: 'whatismycountry.png'
    }
    ]
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = notifyUser;