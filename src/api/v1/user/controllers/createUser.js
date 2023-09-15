// Import external services and dependencies
const {create} = require('../../../../lib/user')

// Create user Controller
const createUser = async (req, res, next) => {
  // request data
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  // Using Create user service
  try {
    const {
      id,
      username: name,
      email: userEmail,
      role: userRole,
      totalRated,
      createdAt,
      updatedAt,
    } = await create({
      username,
      email,
      password,
      role,
    });

    // Structured Response object
    const response = {
      data: {
        id,
        username: name,
        email: userEmail,
        role: userRole,
        totalRated,
        createdAt,
        updatedAt,
      },
      links:{
        self: req.path,
        user: `${req.path}/${id}`
      },
    };

    // send response
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
