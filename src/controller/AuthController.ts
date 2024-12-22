import { NextFunction, Request, Response } from "express";
import { AuthService } from "../service/AuthService";
import {
  userLoginValidationSchema,
  userRegisterValidationSchema,
} from "../validations/authValidations";
import { AppError } from "../utils/AppError";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { name, email, password, role } =
        await userRegisterValidationSchema.validateAsync(req.body);

      const { user, tokens } = await this.authService.registerUser(
        name,
        email,
        password,
        role
      );

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: true,
      });

      res.status(201).json({
        status: "success",
        message: "User registered successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        accessToken: tokens.accessToken,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, password } = await userLoginValidationSchema.validateAsync(
        req.body
      );

      const { user, tokens } = await this.authService.loginUser(
        email,
        password
      );

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: true,
      });

      res.json({
        status: "success",
        message: "User logged in successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        accessToken: tokens.accessToken,
      });
    } catch (error) {
      next(error);
    }
  };

  profile = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ user: req.user });
  };

  refreshAccessToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const refreshToken: string = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new AppError("Refresh token not found.", 401);
      }

      const { newAccessToken, newRefreshToken } =
        await this.authService.refreshTokens(refreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: true,
      });

      res.status(200).json({
        status: "success",
        message: "access tokens refreshed successfully.",
        accessToken: newAccessToken,
      });
    } catch (error) {
      next(error);
    }
  };
}
