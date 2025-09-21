import { serverErrorResponse } from "../utils/apiResponse.js";

export const errorHandler = (err, req, res, next) => {
  console.error("Server error:", err);

  if (err.status) {
    return res.status(err.status).json({
      success: false,
      message: err.message || "error-unknown",
    });
  }

  return serverErrorResponse(res, err.message || "Internal Server Error");
};
