export class TokenExpiredError extends Error {
  constructor() {
    super();
    // Not required, but makes uncaught error messages nicer.
    this.name = 'TokenExpiredError';
  }
}