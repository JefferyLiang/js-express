import express from "express";

export class IRouter {
  constructor(prefix) {
    this.prefix = prefix;
    this.router = express.Router();
  }

  get(path, cb, middleswares = []) {
    this.restHandler("get", path, cb, { middleswares });
  }

  post(path, cb, middleswares = []) {
    this.restHandler("post", path, cb, {
      middleswares
    });
  }

  restHandler(method, path, cb, option = { middleswares: [] }) {
    this.router[method](path, ...option.middleswares, cb);
  }
}
