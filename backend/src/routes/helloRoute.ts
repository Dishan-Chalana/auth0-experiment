import { Router } from "express";
import { requiresAuth } from "express-openid-connect";

const router = Router();

// Define routes
router.get("/hello", requiresAuth(), (req, res) => {
  res.send(`Hello, you logged in as: ${req.oidc.user?.email}`);
});

export default router;
