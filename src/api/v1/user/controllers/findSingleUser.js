// Import external services and dependencies
const userService = require('../../../../lib/user');

// Find user Controller
const findSingleUser = async (req, res, next) => {
  // query data
  const id = req.query.id;

  // Using findUser service
  try {
    const {
      id: userId,
      username: name,
      email: userEmail,
      role: userRole,
      totalRated,
      createdAt,
      updatedAt,
    } = await userService.findUser(id);

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

module.exports = findSingleUser;
