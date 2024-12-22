import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { AuthService } from "../service/AuthService";
import { UserRepository } from "../repositories/UserRepository";
import { validateBody } from "../middleware/validationMiddleware";
import {
  userLoginValidationSchema,
  userRegisterValidationSchema,
} from "../validations/authValidations";
import { authenticate } from "../middleware/authMiddleware";
import { authorizePermission } from "../middleware/permissionMiddleware";

const userRepository = new UserRepository();
const authService = new AuthService(userRepository); // Assuming AuthService is an interface or class
const authController = new AuthController(authService);

const router = Router();

router.post(
  "/register",
  validateBody(userRegisterValidationSchema),
  authController.register
);

router.post(
  "/login",
  validateBody(userLoginValidationSchema),
  authController.login
);

router.get(
  "/profile",
  authenticate,
  authorizePermission("list:user"),
  authController.profile
);

router.get("/refresh", authController.refreshAccessToken);

export default router;
