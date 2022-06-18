/**
 * Express application.
 */

// External imports.
import express from "express"
import cors from "cors"

// Middleware imports.
import { auth } from "@middlewares/auth"
import { error } from "@middlewares/error"
import { member } from "@middlewares/member"

// Repository imports.
import { users } from "@repositories/users"

// Initialize the app.
export const app = express()

// Use the JSON middleware.
app.use(express.json())

// Use the CORS middleware.
app.use(cors())
app.options("*", (_req, res) => res.status(204).send())

// Use the auth middleware.
app.use(auth)

// Use public routes.
app.get("/@member", async (req, res) => {
  const userId = req.actor.id
  const user = await users.get(userId)
  return res.status(200).send(!!user)
})

// Use the membership middleware.
app.use(member)

// Use private routes.
app.get("/members", async (_req, res) => {
  const members = await users.getAll()
  return res.status(200).send(members)
})

// Use the error middleware.
app.use(error)
