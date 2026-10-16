"use server";

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const correctPassword = process.env.ADMIN_PASSWORD;
  
  // Return false if the password is missing or does not match.
  if (!correctPassword || password !== correctPassword) {
    return false;
  }
  
  return true;
}