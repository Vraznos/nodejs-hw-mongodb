const errorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map((err) => err.message);
    return res.status(400).json({
      status: 400,
      message: `Validation error: ${messages.join(', ')}`,
      data: null,
    });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({
      status: 400,
      message: `Invalid ID format: ${error.value}`,
      data: null,
    });
  }

  const { status = 500, message = 'Server error', data = null } = error;

  res.status(status).json({
    status,
    message,
    data,
  });
};

export default errorHandler;
