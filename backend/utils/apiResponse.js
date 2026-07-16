/**
 * Success Response
 */
export const successResponse = (
  res,
  message = "Success",
  data = null,
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Error Response
 */
export const errorResponse = (
  res,
  message = "Something went wrong",
  errors = [],
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

/**
 * Paginated Response
 */
export const paginatedResponse = (
  res,
  message,
  data,
  pagination,
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination,
  });
}; 
