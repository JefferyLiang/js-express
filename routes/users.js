import { IRouter } from "../utils/IRouter";
import { JsonWebToken } from "../middlewares/jsonwebtoken";
import { JWT_REQUIRED } from "../middlewares/jsonwebtoken";

export const router = new IRouter("/api/users");

router.get(
  "/",
  (req, res, next) => {
    res.send("respond with a resource");
  },
  [JWT_REQUIRED]
);

router.post("/login", (req, res, next) => {
  let jwt = new JsonWebToken();
  return res.json({
    code: 200,
    data: {
      token: jwt.signUserToken({
        user_id: 1
      }),
      user_id: 1
    }
  });
});
