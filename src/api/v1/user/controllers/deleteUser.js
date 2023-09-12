// Import Profile Service
const userService = require('../../../../lib/profile');

// Delete user controller
const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Deleting by deleteUser service
    await userService.deleteUser(id);

    // send response
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = deleteUser

