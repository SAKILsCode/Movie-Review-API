// Import Profile Service
const profileService = require('../../../../lib/profile');

// Delete profile controller
const deleteProfile = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Deleting by deleteProfile service
    await profileService.deleteProfile(id);

    // send response
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = deleteProfile

