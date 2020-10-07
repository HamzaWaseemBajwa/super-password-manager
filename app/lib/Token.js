import * as Crypto from "./Crypto";

export default class Token {
  constructor() {
    this.userId = "";
    this.userPasswordSalt = "";
    this.userPasswordHash = "";
  }

  initToken(password) {
    this.userId = Crypto.generateSalt().toString();
    this.userPasswordSalt = Crypto.generateSalt().toString();
    let saltedPassword = password + this.userPasswordSalt.toString();
    this.userPasswordHash = Crypto.getHash(saltedPassword).toString();
  }

  verifyPassword(password) {
    let testSaltedPassword = password + this.userPasswordSalt;
    let testPasswordHash = Crypto.getHash(testSaltedPassword).toString();
    if (testPasswordHash === this.userPasswordHash) {
      return true;
    }
    return false;
  }

  toString() {
    return JSON.stringify(this);
  }
}
