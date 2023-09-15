// Import Profile Service
const {deleteOne} = require('../../../../lib/user');

// Delete user controller
const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Deleting by user service
    await deleteOne(id);

    // send response
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = deleteUser

