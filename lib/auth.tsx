import jwt from "jsonwebtoken";

export interface UserPayload {
  id: string;
  email?: string;
}

export function verifyAuth(token: string): UserPayload | null {
  try {
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    return decoded;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
