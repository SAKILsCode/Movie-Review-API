/**
 * Title: Routes file
 * Description: Handles all the routings of the application.
 */

// Dependencies and imported files
const router = require('express').Router()
const {controllers: userController} = require('../api/v1/user')
const {controllers: movieController} = require('../api/v1/movie')
const {controllers: reviewController} = require('../api/v1/review')
const {controllers: profileController} = require('../api/v1/profile')
const {controllers: authController} = require('../api/v1/auth')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const { roles } = require('../config/userPermissions')

// Auth routes
router.post('/api/v1/auth/signup', authController.register)
router.post('/api/v1/auth/login', authController.login)

// Profile route
router
  .route('/api/v1/profile')
  .patch(authenticate, authorize([roles.admin, roles.user]), profileController.updateProfile)
  .delete(authenticate, authorize([roles.admin, roles.user]), profileController.deleteProfile)

// User routes
router
  .route('/api/v1/users')
  .get(userController.findAllUsers)
  .post(authenticate, authorize([roles.admin]), userController.createUser)
router
  .route('/api/v1/users/:id')
  .get(userController.findSingleUser)
  .patch(authenticate, authorize([roles.admin]), userController.updateUser)
  .delete(authenticate, authorize([roles.admin]), userController.deleteUser)

// User Movies
router.get('/api/v1/users/:id/movies', userController.findUserMovies)

// User Reviews
router.get('/api/v1/users/:id/reviews', userController.findUserReviews)

// Movie routes
router
  .route('/api/v1/movies')
  .get(movieController.findAllMovies)
  .post(authenticate, authorize([roles.admin, roles.user]), movieController.createMovie)
router
  .route('/api/v1/movies/:id')
  .get(movieController.findSingleMovie)
  .patch(authenticate, authorize([roles.admin, roles.user]), movieController.updateMovie)
  .delete(authenticate, authorize([roles.admin, roles.user]), movieController.deleteMovie)

// Review routes
router
  .route('/api/v1/movies/:movieId/reviews')
  .get(reviewController.findAllReviews)
  .post(authenticate, authorize([roles.admin, roles.user]), reviewController.createReview)
router
  .route('/api/v1/movies/:movieId/reviews/:id')
  .get(reviewController.findSingleReview)
  .patch(authenticate, authorize([roles.admin, roles.user]), reviewController.updateReview)
  .delete(authenticate, authorize([roles.admin, roles.user]), reviewController.deleteReview)

module.exports = router