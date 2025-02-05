// app/api/user/route.ts
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const name = user.firstName || user.username || 'Unknown';

  return new Response(JSON.stringify({ name }), { status: 200 });
}
