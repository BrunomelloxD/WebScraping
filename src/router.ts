import { Router } from 'express'

// Routes
import InstagramScrapingController from './controllers/InstagramScrapingController'
const routes = Router()

/**
 * // C - CREATE - POST
 * // R - READ - GET
 * // U - UPDATE - PUT
 * // D - DELETE - DELETE
 */

/**
 * Query Params: http://localhost:3000/users?search=bruno
 * Route Params: http://localhost:3000/users/1
 * Body: http://localhost:3000/users/1
 */

// routes.post(
//     '/instagramFollowers',
//     authInstagramMiddleware,
//     ScrapingController.instagramFollowers
// )
routes.post(
    '/instagramFollowers',
    InstagramScrapingController.instagramFollowers
)

export { routes }
