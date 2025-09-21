export class RegisterDTO {
  constructor({ name, email, password, phone, role = "customer", pets = [] }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.role = role;
    this.pets = pets;
  }
}