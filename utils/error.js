export default class IError extends Error {
  constructor(msg, code, options = {}) {
    super(msg);
    this.status = options.status || 400;
    this.code = code;
    if (options.name) {
      this.name = options.name;
    }
  }
}

export const Unauthorization = new IError("Unauthorization", 403, {
  status: 403
});
