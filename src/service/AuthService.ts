import { IUser } from "../models/userModel";
import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../utils/AppError";
import { comparePasswords, hashPassword } from "../utils/hash";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
export class AuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(
    name: string,
    email: string,
    password: string,
    role: string = "user"
  ): Promise<{
    user: IUser;
    tokens: { accessToken: string; refreshToken: string };
  }> {
    // check if user already exists
    const existingUser = await this.userRepository.findUserByEmail(email);

    if (existingUser) {
      throw new AppError("Email already in use", 400);
    }
    // hash the password
    const hashedPassword = await hashPassword(password);
    // create a new user
    const user = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // create tokens
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // return the user with tokens
    return {
      user,
      tokens: { accessToken, refreshToken },
    };
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<{
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  }> {
    // find user by email
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new AppError("Invalid email.", 400);
    }
    // compare password
    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid password.", 400);
    }
    // create tokens
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      tokens: { accessToken, refreshToken },
    };
  }

  async refreshTokens(refreshToken: string): Promise<{
    newAccessToken: string;
    newRefreshToken: string;
  }> {
    // validate refresh token
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      throw new AppError("Invalid refresh token.", 401);
    }
    // create new tokens
    const newPayload = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    };
    const newAccessToken = generateAccessToken(newPayload);
    const newRefreshToken = generateRefreshToken(newPayload);

    return { newAccessToken, newRefreshToken };
  }
}
