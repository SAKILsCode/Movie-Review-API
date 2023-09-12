// Import Auth Service
const authService = require('../../../../lib/auth');

// Login controller
const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Using Login service
    const { accessToken, userData } = await authService.login({
      email,
      password,
    });

    // Structured response object
    const response = {
      message: 'Login Successful',
      data: {
        id: userData.id,
        username: userData.username,
        email,
        access_token: accessToken,
      },
      links: {
        self: req.url,
      },
    };

    // send response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = login;
