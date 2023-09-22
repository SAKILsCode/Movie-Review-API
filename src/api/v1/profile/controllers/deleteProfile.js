// Import Profile Service
const { deleteProfile: deleteUserProfile } = require('../../../../lib/profile');
const { authenticationError } = require('../../../../utils/error');

// Delete profile controller
const deleteProfile = async (req, res, next) => {
  // Logged in user data
  const id = req.user.id;

  try {
    if (!id) throw authenticationError()

    // Deleting service
    await deleteUserProfile(id);

    // send response
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = deleteProfile;
