// Import Profile Service
const profileService = require('../../../../lib/profile');

// Update profile controller
const updateProfile = async (req, res, next) => {
  const id = req.params.id;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Updating by updateProfile service
    const {
      id: userId,
      username: name,
      email: userEmail,
      role,
      totalRated,
      createdAt,
      updatedAt,
    } = await profileService.updateProfile(id, {
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
        user_movies: `/users/${id}/movies`,
        user_reviews: `/users/${id}/reviews`,
      },
    };

    // send response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = updateProfile;
