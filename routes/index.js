import { IRouter } from "../utils/IRouter";

export const router = new IRouter("/");

router.get("/", (req, res, next) => {
  res.send("Hello Express");
});
