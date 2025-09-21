export class ChangePasswordDTO {
  constructor({ email, oldPassword, newPassword }) {
    this.email = email;
    this.oldPassword = oldPassword;  
    this.newPassword = newPassword;  
  }
}
