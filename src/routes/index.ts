import { Router } from "express";

import authRoutes from "./AuthRoute";

const router = Router();

router.use("/auth", authRoutes);

export default router;
