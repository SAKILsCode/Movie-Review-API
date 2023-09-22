// Import Auth Service
const { register: registerService } = require('../../../../lib/auth');

// Register Controller
const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Using register service
    const {
      id: userId,
      username: name,
      email: userEmail,
      role,
    } = await registerService({ username, email, password });

    // Structured response object
    const response = {
      message: 'Registration Successful',
      data: {
        id: userId,
        username: name,
        email: userEmail,
        role,
      },
      links: {
        self: req.path, // or req.url
        login: req.path.replace('signup', 'login'),
      },
    };

    // send response
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = register;
