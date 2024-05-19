export class CredentialError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = "CredentialError"
  }
}

export class AccountError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = "AccountError"
  }
}