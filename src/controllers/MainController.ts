import { Context, Next } from 'koa'

class MainController {
  /**
   * Redirect to the documentation
   * @param ctx Context
   * @param next Next
   */
  public async example(ctx: Context, next: Next) {
    ctx.body = {
      message: 'Hello world!',
    }

    await next()
    return
  }
}

export default new MainController()
