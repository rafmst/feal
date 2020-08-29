import Router from 'koa-router'
import MainController from './controllers/MainController'
import AuthController from './controllers/AuthController'

// Create router instance
const router = new Router()

// Router groups instanciation
let routerGroups = []

// Auth related routes
router.post('/register', AuthController.register)
router.post('/authenticate', AuthController.authenticate)

// Define routes and respective methods
router.get('/', MainController.example)

// Load all groups
routerGroups.map((group) => {
  router.use(group.routes(), group.allowedMethods())
})

export default router
