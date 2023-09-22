// Import Auth Service
const { login: loginService } = require('../../../../lib/auth');

// Login controller
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Using Login service
    const {
      id,
      username,
      email: userEmail,
      role,
      accessToken,
    } = await loginService({
      email,
      password,
    });

    // Structured response object
    const response = {
      message: 'Login Successful',
      data: {
        id,
        username,
        email: userEmail,
        role,
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
