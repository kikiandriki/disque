/**
 * Member of server middleware.
 */

// External imports.
import { NextFunction, Request, Response } from "express"

// Repository imports.
import { users } from "@repositories/users"

// Utility imports.
import { ForbiddenError } from "@utils/exceptions"

/**
 * Express member handler.
 */
export const member = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const userId = req.actor.id
  const user = await users.check(userId)
  if (!user) {
    throw new ForbiddenError("You are not a member of the server.")
  }
  return next()
}
