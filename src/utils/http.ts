/**
 * HTTP utilities.
 */

// External imports.
import axiosBase from "axios"

// Utility imports.
import { ServerError } from "@utils/exceptions"

// Server ID constant.
const SERVER_ID = "558027628502712330"

// Axios base object.
export const axios = axiosBase.create({
  baseURL: "https://discord.com/api",
  headers: {
    Authorization: `Bot ${process.env.BOT_TOKEN}`,
    "Content-Type": "application/json",
  },
})

/**
 * Fetch a member from Discord.
 */
export async function fetchMember(id: string): Promise<DiscordMember | null> {
  const response = await axios.get<DiscordMember>(
    `/guilds/${SERVER_ID}/members/${id}`,
    {
      validateStatus: null,
    },
  )
  if (response.status === 200) {
    return response.data
  } else if (response.status === 404) {
    return null
  }
  throw new ServerError("Failed to fetch user.")
}

/**
 * Fetch members from Discord.
 */
export async function fetchMembers() {
  const response = await axios.get(`/guilds/${SERVER_ID}/members`)
  if (response.status === 200) {
    return response.data
  }
  throw new ServerError("Failed to fetch users.")
}
