const nodemailer = require('nodemailer');

const appUrl = process.env.APP_URL;
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user,
    pass,
  },
});

module.exports.sendValidationEmail = (email, activationToken, name) => {
  transport.sendMail({
      to: email,
      from: `PeakHunt <${user}>`,
      subject: 'Activate your account',
      html: `
					<h1>Hi ${name}</h1>
					<p>Click on the button below to activate your account </p>
					<a href="${appUrl}/activate?token=${activationToken}" style="padding: 10px 20px; color: white; background-color: pink; border-radius: 5px;">Click here</a>
				`,
    })
    .then(() => {
      console.log('email sent');
    })
    .catch(console.error);
};

module.exports.sendForgotMail = (token, email) => {
  console.log('transport:', token);
  console.log('mail:', email);
  transport
    .sendMail({
      to: email,
      from: `Peakhunt<${user}>`,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account 
        Please click on the following link, or paste this into your browser to complete the process
        <a href=${appUrl}/reset?token=${token} style="padding: 10px 20px; color: white; background-color: pink; border-radius: 5px;">Click here</a>`
          })
    .then(() => {
      console.log('Forgot email sent');
    })
    .catch(console.error);
}

