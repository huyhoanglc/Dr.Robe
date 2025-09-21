import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AccountRepository } from "../repositories/account.repository.js";
import { UserInfoRepository } from "../repositories/userInfo.repository.js";
import { PetRepository } from "../repositories/pet.repository.js";
import { LoginDTO } from "../dtos/login.dto.js";
import { RegisterDTO } from "../dtos/register.dto.js";
import { ChangePasswordDTO } from "../dtos/changePassword.dto.js";
import { ForgotPasswordDTO } from "../dtos/forgotPassword.dto.js";
import { sendVerificationEmail } from "./mail.service.js";

const generateToken = (accountId) => {
  return jwt.sign({ id: accountId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
    algorithm: "HS512",
  });
};

const generateVerifyToken = (accountId) => {
  return jwt.sign({ id: accountId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const AuthService = {
  register: async (data) => {
    const dto = new RegisterDTO(data);
    const existingEmail = await AccountRepository.findByEmail(dto.email);
    if (existingEmail) throw new Error("email-already-exists");

    const userInfo = await UserInfoRepository.create({
      name: dto.name,
      role: dto.role,
    });
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const account = await AccountRepository.create({
      provider: "local",
      email: dto.email,
      password: hashedPassword,
      user: userInfo._id,
      isVerified: false,
    });

    const verifyToken = generateVerifyToken(account._id);
    const verifyUrl = `${process.env.CLIENT_URL}/verify/${verifyToken}`;
    await sendVerificationEmail(dto.email, dto.name, verifyUrl);

    return { userInfo, account };
  },

  verifyEmail: async (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const account = await AccountRepository.findById(decoded.id);
      if (!account) throw new Error("account-not-found");
      account.isVerified = true;
      await account.save();
      return { message: "account-verified" };
    } catch {
      throw new Error("invalid-or-expired-token");
    }
  },

  login: async (data) => {
    const dto = new LoginDTO(data);

    const account = await AccountRepository.findByEmail(dto.email);
    if (!account) throw new Error("invalid-email");

    const isMatch = await bcrypt.compare(dto.password, account.password);
    if (!isMatch) throw new Error("invalid-password");

    const userInfo = await UserInfoRepository.findById(account.user);

    return { account, userInfo, token: generateToken(account._id) };
  },

  changePassword: async (data) => {
    const dto = new ChangePasswordDTO(data);

    const account = await AccountRepository.findByEmail(dto.email);
    if (!account) throw new Error("email-not-found");

    const isMatch = await bcrypt.compare(dto.oldPassword, account.password);
    if (!isMatch) throw new Error("old-password-is-not-correct");

    account.password = await bcrypt.hash(dto.newPassword, 10);
    await account.save();

    return { message: "change-password-successfully" };
  },

  forgotPassword: async (data) => {
    const dto = new ForgotPasswordDTO(data);

    const account = await AccountRepository.findByEmail(dto.email);
    if (!account) throw new Error("account-not-found");

    const resetToken = jwt.sign({ id: account._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const userInfo = await UserInfoRepository.findById(account.user);
    await sendForgotPasswordEmail(dto.email, userInfo.name, resetUrl);

    return { message: "reset-password-email-sent" };
  },
  
  getAccountById: async (id) => {
    return await AccountRepository.findById(id);
  },

  getUserInfoByAccount: async (accountId) => {
  const account = await AccountRepository.findById(accountId);
  if (!account) return null;

  const userInfo = await UserInfoRepository.findById(account.user)
    .populate("pets")
    .lean();

  return userInfo;
},
};
