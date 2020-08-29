import Koa from 'koa'
import logger from 'koa-logger'
import bodyparser from 'koa-bodyparser'
import json from 'koa-json'
import cors from '@koa/cors'
import mongoose from 'mongoose'
import 'dotenv/config'

import router from './routes'

class App {
  public app: Koa

  public constructor() {
    this.app = new Koa()

    this.database()
    this.middlewares()
    this.routes()
  }

  /**
   * Load middlewares
   */
  private middlewares(): void {
    this.app.use(cors())
    this.app.use(json())
    this.app.use(logger())
    this.app.use(bodyparser())
  }

  /**
   * Load database
   */
  private database(): void {
    mongoose.connect(process.env.DATABASE!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }

  /**
   * Load routes
   */
  private routes(): void {
    this.app.use(router.routes())
    this.app.use(router.allowedMethods())
  }
}

export default new App().app
