import { Router } from "express";
import weatherRoutes from "./weather";
import directionsRoutes from "./directions";

const router = Router();

router.use("/weather", weatherRoutes);
router.use("/directions", directionsRoutes);

export default router;
