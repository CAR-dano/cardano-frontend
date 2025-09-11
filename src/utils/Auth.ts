export interface UserLogin {
  loginIdentifier: string;
  password: string;
}
export interface UserSignUp {
  username: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  username: string | null;
  name: string | null;
  walletAddress: string | null;
  whatsappNumber: string | null;
  role: "ADMIN" | "USER" | string; // tambahkan role lain jika perlu
  createdAt: string; // bisa juga pakai Date tergantung parsing
  updatedAt: string;
}
