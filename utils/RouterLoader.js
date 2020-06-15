import fs from "fs";
import { IRouter } from "./IRouter";

export default class RouterLoader {
  constructor(
    app,
    option = {
      routesPath: null,
      routes: []
    }
  ) {
    this.app = app;
    this.routes = option.routes || [];
    if (option.routesPath) {
      this.readRoutesInFilePath(option.routesPath);
    }
  }

  readRoutesInFilePath(path) {
    let routerFiles = fs.readdirSync(path).filter((val) => val.endsWith(".js"));
    for (let file of routerFiles) {
      let { router } = require(`${path}/${file}`);
      if (router instanceof IRouter) {
        this.routes.push(router);
      }
    }
  }

  load() {
    for (let router of this.routes) {
      this.app.use(router.prefix, router.router);
    }
  }
}
