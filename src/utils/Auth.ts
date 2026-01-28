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
  whatsappNumber?: string | null;
  inspectionBranchCity?: {
    id: string;
    city?: string | null;
    code?: string | null;
  } | null;
  isActive?: boolean;
  role: "ADMIN" | "SUPERADMIN" | "REVIEWER" | "INSPECTOR" | "CUSTOMER" | "DEVELOPER" | "USER" | string; // tambahkan role lain jika perlu
  createdAt: string; // bisa juga pakai Date tergantung parsing
  updatedAt: string;
}
