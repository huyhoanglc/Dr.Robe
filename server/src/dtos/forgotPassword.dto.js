export class ForgotPasswordDTO {
  constructor({ email, newPassword }) {
    this.email = email;  
    this.newPassword = newPassword;  
  }
}
