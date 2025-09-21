export interface User {
  id: string;
  email: string;
  name: string;
  role: "customer" | "vet" | "staff" | "admin";
  pets?: any[];
}