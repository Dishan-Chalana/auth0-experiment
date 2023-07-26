import "dotenv/config";
import express from "express";
import { auth, requiresAuth } from "express-openid-connect";
import helloRoutes from "./routes/helloRoute";
import morgon from "morgan";



const app = express();

const port = process.env.PORT || 3000;

//logging
app.use(morgon("dev"));

//configuring express-openid-connect
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
  };

  app.use(auth(config));

  app.use("/api/", helloRoutes);
  
  // req.oidc.isAuthenticated is provided from the auth router
  app.get("/", (req, res) => {
    res.send(
      req.oidc.isAuthenticated() ? "Logged in succsessfully" : "Logged out"
    );
  });
  
  app.get("/profile", requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
