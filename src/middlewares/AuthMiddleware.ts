import { Context, Next } from 'koa'
import jwt from 'jsonwebtoken'

class AuthMiddleware {
  /**
   * Ensure that a token was received
   * @param ctx Context
   * @param next Next
   */
  public async ensureToken(ctx: Context, next: Next): Promise<void> {
    const authorizationHeader = ctx.request.headers.authorization
    if (typeof authorizationHeader === 'string') {
      const bearerContent = authorizationHeader.split(' ')
      const token = bearerContent[2]
      ctx.token = token
      await next()
    } else {
      ctx.response.status = 403
    }
  }

  /**
   * Verify the tokens identity
   * @param ctx Context
   * @param next Next
   */
  public async verifyToken(ctx: Context, next: Next): Promise<void> {
    const secretKey = process.env.SECRET!

    try {
      const data = jwt.verify(ctx.token, secretKey)
      if (typeof data === 'object') {
        ctx.user = (<any>data).user
      }
      await next()
    } catch (err) {
      ctx.response.status = 403
    }
  }
}

export default new AuthMiddleware()
