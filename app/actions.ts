"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { UserSignup } from "./db/schema";
import { db } from "./db";

export async function createUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");

  // Fetch user details from Clerk
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const email = user.emailAddresses[0]?.emailAddress || "Unknown";
  const name = user.firstName || user.username || 'Unknown';

  // Check if the user already exists in the database
  const existingUser = await db
    .select()
    .from(UserSignup)
    .where(eq(UserSignup.user_id, userId))
    .execute();

  // Insert user if not already present
  if (existingUser.length === 0) {
    await db.insert(UserSignup).values({
      user_id: userId,
      email,
      name
    });
  } else {
    console.log("User already exists in the database.");
  }
}