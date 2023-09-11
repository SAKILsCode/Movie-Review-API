/**
 * Title: Routes file
 * Description: Handles all the routings of the application.
 */

// Dependencies
const router = require('express').Router()
const {controllers: userController} = require('../api/v1/user')
const {controllers: movieController} = require('../api/v1/movie')
const {controllers: reviewController} = require('../api/v1/review')
const {controllers: profileController} = require('../api/v1/profile')
const {controllers: authController} = require('../api/v1/auth')

// Auth routes
router.get('/api/v1/auth/signup', authController.register)
router.get('/api/v1/auth/login', authController.login)

// Profile route
router
  .route('/api/v1/profile')
  .patch(profileController.updateProfile)
  .delete(profileController.deleteProfile)

// User routes
router
  .route('/api/v1/users')
  .get(userController.findAllUsers)
  .post(userController.createUser)
router
  .route('/api/v1/users/:id')
  .get(userController.findSingleUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)

// User Movies
router.get('/api/v1/use rs/:id/movies', userController.findUserMovies)

// User Reviews
router.get('/api/v1/users/:id/reviews', userController.findUserReviews)

// Movie routes
router
  .route('/api/v1/movies')
  .get(movieController.findAllMovies)
  .post(movieController.createMovie)
router
  .route('/api/v1/movies/:id')
  .get(movieController.findSingleMovie)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie)

// Review routes
router
  .route('/api/v1/reviews')
  .get(reviewController.findAllReviews)
  .post(reviewController.createReview)
router
  .route('/api/v1/reviews/:id')
  .get(reviewController.findSingleReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview)

module.exports = router