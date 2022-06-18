/**
 * Express application.
 */

// External imports.
import express from "express"
import cors from "cors"

// Middleware imports.
import { auth } from "@middlewares/auth"
import { error } from "@middlewares/error"

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

// Use routes.
app.get("/@member", async (req, res, next) => {
  const userId = req.actor.id
  const user = await users.get(userId)
  res.status(200).send(!!user)
  return next()
})

// Use the error middleware.
app.use(error)
