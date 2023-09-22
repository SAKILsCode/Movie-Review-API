// Import Profile Service
const {
  updateProfile: updateProfileService,
} = require('../../../../lib/profile');
const { matchLoggedInUser } = require('../../../../utils');
const { authenticationError } = require('../../../../utils/error');

// Update profile controller
const updateProfile = async (req, res, next) => {
  // Request data
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // Logged in user data
  const id = req.user.id;

  try {
    if (!id) throw authenticationError()

    // Updating by updateProfile service
    const {
      id: userId,
      username: name,
      email: userEmail,
      role,
      totalRated,
      createdAt,
      updatedAt,
    } = await updateProfileService(id, {
      username,
      email,
      password,
    });

    // Structured response object
    const response = {
      message: 'Successfully updated',
      data: {
        id: userId,
        username: name,
        email: userEmail,
        role,
        totalRated,
        createdAt,
        updatedAt,
      },
      links: {
        self: req.path,
        user_movies: `${req.path.replace(/\/profile\//, '/users/')}/movies`,
        user_reviews: `${req.path.replace(/\/profile\//, '/users/')}/reviews`,
      },
    };

    // send response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = updateProfile;
