import { Router, Request, Response } from "express";

const router = Router();

// router.use("/weather", weatherRoutes);
// router.use("/directions", directionsRoutes);

router.get("/", (req: Request, res: Response) => {
    res.render("index");
});

export default router;
