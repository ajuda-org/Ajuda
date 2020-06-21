import { Router } from 'express'
import UserController from './app/controllers/UserController'
const routes = new Router()

routes.get('/', UserController.index)

export default routes