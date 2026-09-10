"use server";

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const correctPassword = process.env.ADMIN_PASSWORD;
  
  // Şifre boşsa veya eşleşmiyorsa false döner
  if (!correctPassword || password !== correctPassword) {
    return false;
  }
  
  return true;
}