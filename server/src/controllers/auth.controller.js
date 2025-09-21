import { AuthService } from "../services/auth.service.js";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from "../utils/apiResponse.js";

export const AuthController = {
  register: async (req, res) => {
    try {
      const { userInfo, account, token } = await AuthService.register(req.body);

      return successResponse(
        res,
        "user-register-success",
        {
          id: account._id,
          name: userInfo.name,
          email: account.email,
          role: userInfo.role,
          token,
        },
        201
      );
    } catch (err) {
      if (err.errors) {
        return validationErrorResponse(res, err.errors);
      }
      return errorResponse(res, err.message || "error-server", 400);
    }
  },

  login: async (req, res) => {
    try {
      const { account, userInfo, token } = await AuthService.login(req.body);

      return successResponse(res, "user-login-success", {
        id: account._id,
        email: account.email,
        role: userInfo.role,
        token,
      });
    } catch (err) {
      if (err.errors) {
        return validationErrorResponse(res, err.errors);
      }
      return errorResponse(res, err.message || "error-server", 400);
    }
  },

  changePassword: async (req, res) => {
    try {
      const result = await AuthService.changePassword(req.body);
      return successResponse(res, "change-password-success", result);
    } catch (err) {
      if (err.errors) {
        return validationErrorResponse(res, err.errors);
      }
      return errorResponse(res, err.message || "error-server", 400);
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const result = await AuthService.forgotPassword(req.body);
      return successResponse(res, "forgot-password-success", result);
    } catch (err) {
      if (err.errors) {
        return validationErrorResponse(res, err.errors);
      }
      return errorResponse(res, err.message || "error-server", 400);
    }
  },

  fetchData: async (req, res) => {
    try {
      const accountId = req.user.id;
      const userInfo = await AuthService.getUserInfoByAccount(accountId);

      if (!userInfo) {
        return errorResponse(res, "user-not-found", 404);
      }

      return successResponse(res, "get-user-success", userInfo);
    } catch (err) {
      return errorResponse(res, err.message || "error-server", 400);
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const { token } = req.body; 
      const result = await AuthService.verifyEmail(token);

      return successResponse(res, "verify-email-success", result);
    } catch (err) {
      if (err.errors) {
        return validationErrorResponse(res, err.errors);
      }
      return errorResponse(res, err.message || "error-server", 400);
    }
  },
};
