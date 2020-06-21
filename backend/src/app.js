import express from 'express'
import cors from 'cors'
import youch from 'youch'
import routes from './routes'

import './database'

class App {
  constructor(){
    this.server = express()
    this.middlewares()
    this.routes()
    this.exceptionHandler()
  }

  middlewares() {
    this.server.use(cors())
    this.server.use(express.json())
  }

  routes() {
    this.server.use(routes)
  }

  exceptionHandler() {
    this.server.use( async (error, req, res, next) => {
      const errors = await new youch(error, req).toJSON()
      return res.status(500).json(errors)
    })
  }
}

export default new App().server