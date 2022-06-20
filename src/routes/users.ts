/**
 * Users routes.
 */

// External imports.
import express from "express"

// Middleware imports.
import { member } from "@middlewares/member"

// Repository imports.
import { users as usersRepository } from "@repositories/users"
import { NotFoundError } from "@utils/exceptions"

// The router.
export const users = express.Router()

/**
 * Get current user membership status.
 */
users.get("/@member", async (req, res) => {
  const user = await usersRepository.check(req.actor.id)
  return res.status(200).send(!!user)
})

/**
 * List all members.
 */
users.get("/members", member, async (_req, res) => {
  const members = await usersRepository.list()
  return res.status(200).send(members)
})

/**
 * Get one member.
 */
users.get("/members/:memberId", member, async (req, res) => {
  const member = await usersRepository.get(req.params.memberId)
  if (!member) {
    throw new NotFoundError("Member not found.")
  }
  return res.status(200).send(member)
})
