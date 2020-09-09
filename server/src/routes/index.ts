import { Router } from "express";
import apiRoutes from "./api";
import frontendRoutes from "./frontend";

const router = Router();

router.use("/api", apiRoutes);
router.use("/", frontendRoutes);

export default router;
