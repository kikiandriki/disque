declare global {
  interface DiscordMember {
    id: string
  }
  namespace Express {
    export interface Request {
      actor: {
        sub: string
        id: string
        permissions: string[]
        system: boolean
      }
    }
  }
}

export {}
