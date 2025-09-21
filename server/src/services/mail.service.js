import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify()
  .then(() => console.log("SMTP connection ready "))
  .catch(err => console.error("SMTP error ", err));

export const sendVerificationEmail = async (to, name, verifyUrl) => {
  const html = `
  <div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; color: #212121">
    <div style="max-width: 600px; margin: auto">
      <!-- Header -->
      <div
        style="
          text-align: center;
          background-color: #83D9AE;
          padding: 40px 16px;
          border-radius: 32px 32px 0 0;
          color: #fff;
          font-size: 28px;
          font-weight: bold;
        "
      >
        Dr. Robe
      </div>

      <!-- Content -->
      <div style="padding: 28px">
        <h1 style="font-size: 24px; margin-bottom: 20px; color: #83D9AE">
          ✅ Verify Your Account
        </h1>

        <p>Hello <strong>${name}</strong>,</p>
        <p>We received a request to verify your account for <strong>Dr. Robe</strong>.  
        Please confirm your email address by clicking the button below:</p>

        <div style="text-align: center; margin: 32px 0">
          <a
            href="${verifyUrl}"
            style="
              display: inline-block;
              padding: 14px 24px;
              font-size: 16px;
              background-color: #83D9AE;
              color: #fff;
              text-decoration: none;
              border-radius: 8px;
            "
            target="_blank"
          >
            Verify Account
          </a>
        </div>

        <p style="color: #555">
          If you did not request this, please ignore this email.  
          This verification link will expire in 24 hours.
        </p>
      </div>

      <!-- Footer -->
      <div
        style="
          text-align: center;
          background-color: #83D9AE;
          padding: 20px;
          border-radius: 0 0 32px 32px;
          color: #fff;
        "
      >
        <p style="margin: 0">
          Need help? Contact us at
          <a href="mailto:drrobehcm@gmail.com" style="color: #fff; text-decoration: underline">
            drrobehcm@gmail.com
          </a>
        </p>
      </div>
    </div>
  </div>
  `;

  await transporter.sendMail({
    from: `"Dr. Robe" <${process.env.MAIL_USER}>`,
    to,
    subject: "Verify your account",
    html,
  });
};

export const sendForgotPasswordEmail = async (to, name, resetUrl) => {
  const html = `
  <div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; color: #212121">
    <div style="max-width: 600px; margin: auto">
      <!-- Header -->
      <div
        style="
          text-align: center;
          background-color: #83D9AE;
          padding: 40px 16px;
          border-radius: 32px 32px 0 0;
          color: #fff;
          font-size: 28px;
          font-weight: bold;
        "
      >
        Dr. Robe
      </div>

      <!-- Content -->
      <div style="padding: 28px">
        <h1 style="font-size: 24px; margin-bottom: 20px; color: #83D9AE">
          🔑 Reset Your Password
        </h1>

        <p>Hello <strong>${name}</strong>,</p>
        <p>We received a request to reset your password for <strong>Dr. Robe</strong>.  
        Click the button below to set a new password:</p>

        <div style="text-align: center; margin: 32px 0">
          <a
            href="${resetUrl}"
            style="
              display: inline-block;
              padding: 14px 24px;
              font-size: 16px;
              background-color: #83D9AE;
              color: #fff;
              text-decoration: none;
              border-radius: 8px;
            "
            target="_blank"
          >
            Reset Password
          </a>
        </div>

        <p style="color: #555">
          If you did not request this, you can safely ignore this email.  
          This reset link will expire in 24 hours.
        </p>
      </div>

      <!-- Footer -->
      <div
        style="
          text-align: center;
          background-color: #83D9AE;
          padding: 20px;
          border-radius: 0 0 32px 32px;
          color: #fff;
        "
      >
        <p style="margin: 0">
          Need help? Contact us at
          <a href="mailto:drrobehcm@gmail.com" style="color: #fff; text-decoration: underline">
            drrobehcm@gmail.com
          </a>
        </p>
      </div>
    </div>
  </div>
  `;

  await transporter.sendMail({
    from: `"Dr. Robe" <${process.env.MAIL_USER}>`,
    to,
    subject: "Reset your password",
    html,
  });
};
