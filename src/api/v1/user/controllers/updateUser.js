// Import external services and dependencies
const userService = require('../../../../lib/user');

// Update user Controller
const updateUser = async (req, res, next) => {
  // query data
  const id = req.query.id
  // Request data
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const role = req.body.role

  // Using updateUser service
  try {
    const {
      id: userId,
      username: name,
      email: userEmail,
      role: userRole,
      totalRated,
      createdAt,
      updatedAt,
    } = await userService.updateUser(id, {username, email, password, role});

    // Structured Response object
    const response = {
      data: {
        id: userId,
        username: name,
        email: userEmail,
        role: userRole,
        totalRated,
        createdAt,
        updatedAt,
      },
      links: {
        self: req.path,
        user_movies: `/users/${id}/movies`,
      },
    };

    // send response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;
