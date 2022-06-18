/**
 * Users repository.
 */

// Utility imports.
import { getMember, writeMember } from "@utils/cache"
import { fetchMember } from "@utils/http"

/**
 * The users repository class.
 */
class UserRepository {
  async get(id: string) {
    const cached = await getMember(id)
    if (cached) {
      return cached
    } else if (cached === false) return null
    else {
      const user = await fetchMember(id)
      await writeMember(id, user ? user : "false")
      return user
    }
  }
}

// Export the repository instance.
export const users = new UserRepository()
