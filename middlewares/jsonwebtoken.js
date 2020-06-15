import jwt from "jsonwebtoken";
import * as _ from "lodash";
import { Unauthorization } from "../utils/error";
const debug = require("debug")("debug:jsonwebtoken");
// const
const ONE_HOUR = 1000 * 60 * 60;
const JWT_ALLOW_TYPES = ["Bearer"];
const JWT_KEY = "TEST_JWT_KEY_20200613";
const JWT_TYPES = {
  TOKEN: "TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN"
};
const JWT_EXPIRES_IN = {
  TOKEN: process.env.NODE_ENV === "production" ? ONE_HOUR * 2 : ONE_HOUR * 24,
  REFRESH_TOKEN:
    process.env.NODE_ENV === "production"
      ? ONE_HOUR * 24 * 6
      : ONE_HOUR * 24 * 15
};

export class JsonWebToken {
  constructor() {
    this.JWT_KEY = JWT_KEY;
    this.jwt = jwt;
  }

  signUserToken(user_data) {
    console.log(JWT_EXPIRES_IN.TOKEN);
    return this.sign(
      {
        data: user_data,
        type: JWT_TYPES.TOKEN
      },
      JWT_EXPIRES_IN.TOKEN
    );
  }

  /**
   *
   * @param {object} msg 签名信息字符串
   * @param {string} expiresIn 签名有效时间
   */
  sign(msg, expiresIn) {
    return this.jwt.sign(msg, this.JWT_KEY, { expiresIn });
  }

  verify(token) {
    try {
      let decode = this.jwt.verify(token, this.JWT_KEY);
      return decode;
    } catch (err) {
      throw err;
    }
  }
}
export const JWT_REQUIRED = (req, res, next) => {
  if (req.meta && req.meta.type === JWT_TYPES.TOKEN) {
    return next();
  }
  return next(Unauthorization);
};

export const JsonwebtokenMiddleware = (req, res, next) => {
  let auth = req.headers["authorization"];
  if (!auth) {
    return next();
  }
  let [tokenType, tokenData] = auth.split(" ");
  try {
    if (JWT_ALLOW_TYPES.indexOf(tokenType) === -1) {
      throw new Error(`Not allow token tpye: ${tokenType}`);
    }
    let jwt = new JsonWebToken();
    let result = jwt.verify(tokenData);
    req.meta = Object.assign(result.data, { type: result.type });
    debug(req.meta);
    return next();
  } catch (err) {
    return next(err);
  }
};
