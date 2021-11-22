const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const emailService = () => {
  
  const sendEmail = async (msg) => {
    sgMail
      .send(msg)
      .then(() => {}, error => {
        console.error(error);
        if (error.response) {
          console.error(error.response.body)
        }
      });
  };

  return { sendEmail };
};
