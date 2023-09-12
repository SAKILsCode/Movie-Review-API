const badRequest = (msg = 'Bad Request') => {
	const error = new Error(msg);
	error.status = 400;
  error.error = 'Bad Request'
	return error;
};

const authenticationError = (msg = 'Authentication Failed') => {
  const error = new Error(msg);
  error.error = 'Unauthorized'
	error.status = 401;
	return error;
};

const authorizationError = (msg = 'Permission Denied') => {
  const error = new Error(msg);
  error.error = 'Forbidden'
	error.status = 403;
	return error;
};

const notFound = (msg = 'Resource not found') => {
  const error = new Error(msg);
  error.error = 'Not Found'
	error.status = 404;
	return error;
};

const conflict = (msg = 'Resource already exist') => {
  const error = new Error(msg)
  error.error = 'Conflict'
  error.status = 409
  return error
}

const serverError = (msg = 'Internal Server Error') => {
  const error = new Error(msg);
  error.error = 'Internal Server Error'
	error.status = 500;
	return error;
};



module.exports = {
	badRequest,
	authenticationError,
	authorizationError,
	notFound,
  conflict,
	serverError,
};
