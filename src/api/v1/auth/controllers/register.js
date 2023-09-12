// Import Auth Service
const authService = require('../../../../lib/auth');

// Register Controller
const register = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Using register service
    const {
      id: userId,
      username: name,
      email: userEmail,
    } = await authService.register({ username, email, password });

    // Structured response object
    const response = {
      message: 'Registration Successful',
      data: {
        id: userId,
        username: name,
        email: userEmail,
      },
      links: {
        self: req.path, // or req.url
        login: '/auth/login',
      },
    };

    // send response
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = register;
