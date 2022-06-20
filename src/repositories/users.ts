/**
 * Users repository.
 */

// Utility imports.
import { cache } from "@utils/cache"
import { ServerError } from "@utils/exceptions"
import { discord } from "@utils/http"

/**
 * The users repository class.
 */
class UserRepository {
  async check(id: string): Promise<boolean> {
    const cached = await cache.get<{ member: boolean }>(`membership:${id}`)
    if (!cached?.member) {
      const response = await discord.get(`/members/${id}`)
      if (response.status === 404) {
        await cache.set(`membership:${id}`, { member: false })
        return false
      } else if (response.status !== 200) {
        throw new ServerError("Failed to fetch user from Discord.")
      }
      await cache.set(`membership:${id}`, { member: true })
      return true
    }
    return cached.member
  }

  async get(id: string): Promise<DiscordMember | undefined> {
    const cached = await cache.get<DiscordMember | { user: false }>(
      `members:${id}`,
    )
    if (!cached) {
      const response = await discord.get(`/members/${id}`)
      if (response.status === 404) {
        await cache.set(`members:${id}`, { user: false })
        return
      } else if (response.status !== 200) {
        throw new ServerError("Failed to fetch user from Discord.")
      }
      await cache.set(`members:${id}`, response.data)
      return response.data
    }
    return cached.user === false ? undefined : cached
  }

  async list(): Promise<DiscordMember[] | undefined> {
    const cached = await cache.get<DiscordMember[]>("members")
    if (!cached) {
      const response = await discord.get("/members", {
        params: {
          limit: 100,
        },
      })
      if (response.status !== 200) {
        throw new ServerError("Unable to fetch users from Discord.")
      }
      await cache.set("members", response.data)
      return response.data
    }
    return cached
  }
}

// Export the repository instance.
export const users = new UserRepository()
