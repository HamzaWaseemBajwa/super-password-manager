import aes from "crypto-js/aes";
import keyStretch from "crypto-js/pbkdf2";
import sha256 from "crypto-js/sha256";
import encoder from "crypto-js/enc-utf8";
import crypto from "crypto-js";

export const encryptData = (text, key, salt) => {
  try {
    const passKey = keyStretch(key, salt).toString();
    const ciphertext = aes.encrypt(text, passKey).toString();
    return ciphertext;
  } catch (e) {
    console.log(e);
  }
  return null;
};

export const decryptData = (encryptedData, key, salt) => {
  try {
    const passKey = keyStretch(key, salt).toString();
    const bytes = aes.decrypt(encryptedData, passKey);
    const originalText = bytes.toString(encoder);
    return originalText;
  } catch (e) {
    console.log(e);
  }
  return null;
};

export const generateSalt = () => {
  let salt = crypto.lib.WordArray.random(128 / 8);
  return salt;
};

export const getHash = (string) => {
  let hash = sha256(string);
  return hash;
};

export const deriveKey = (key, salt) => {
  return keyStretch(key, salt).toString();
};
