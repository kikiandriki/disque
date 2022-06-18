/**
 * Cache utilities.
 */

// Database imports.
import { redis } from "@db/redis"

/**
 * Get a member from cache.
 */
export async function getMember(
  id: string,
): Promise<DiscordMember | false | null> {
  const res = await redis.get(id)
  if (res === "false") return false
  if (!res) return null
  return JSON.parse(res) as DiscordMember
}

/**
 * Check if a user is a member in cache.
 */
export async function isMember(id: string): Promise<boolean | null> {
  const member = await getMember(id)
  if (member) return true
  return member
}

/**
 * Write user data to the cache.
 */
export async function writeMember(
  id: string,
  member: string | DiscordMember,
  ttl = 300,
) {
  const data = typeof member === "string" ? member : JSON.stringify(member)
  await redis.set(id, data, "EX", ttl)
}
