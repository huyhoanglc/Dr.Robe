export const successResponse = (res, messageKey, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    status: statusCode,
    success: true,
    message: messageKey,
    data,
  });
};

export const errorResponse = (res, errorKey, statusCode = 400) => {
  return res.status(statusCode).json({
    status: statusCode,
    success: false,
    error: errorKey, 
  });
};

export const notFoundResponse = (res, errorKey = "error-not-found") => {
  return errorResponse(res, errorKey, 404);
};

export const unauthorizedResponse = (res, errorKey = "error-unauthorized") => {
  return errorResponse(res, errorKey, 401);
};

export const forbiddenResponse = (res, errorKey = "error-forbidden") => {
  return errorResponse(res, errorKey, 403);
};

export const validationErrorResponse = (res, errors, errorKey = "error-validation") => {
  return res.status(422).json({
    status: 422,
    success: false,
    error: errorKey,
    errors,          
  });
};

export const serverErrorResponse = (res, errorKey = "error-server") => {
  return errorResponse(res, errorKey, 500);
};
