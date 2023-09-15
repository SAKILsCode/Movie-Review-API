// Import external services and dependencies
const {findSingle} = require('../../../../lib/user');

// Find user Controller
const findSingleUser = async (req, res, next) => {
  // Req data
  const id = req.params.id;

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
    } = await findSingle(id);

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
        user_movies: `${req.path}/movies`,
      },
    };

    // send response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingleUser;
