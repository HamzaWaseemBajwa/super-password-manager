import AsyncStorage from "@react-native-community/async-storage";
import encoder from "crypto-js/enc-utf8";

import { encryptData, decryptData } from "./PasswordUtils";

const USER_PASSWORD = "text123";
const SALT = "mySalt123";

export async function AsyncLoadObject(storageKey) {
  try {
    const cipherText = await AsyncStorage.getItem(storageKey);
    console.log(cipherText);
    if (cipherText != null) {
      const cryptoKey = USER_PASSWORD;
      const bytes = decryptData(cipherText, cryptoKey);
      const jsonValue = bytes.toString(encoder);

      if (jsonValue != null) {
        const fetchedData = JSON.parse(jsonValue);
        return fetchedData;
      }
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function AsyncStoreObject(storageKey, object) {
  try {
    const jsonValue = JSON.stringify(object);
    const cryptoKey = USER_PASSWORD;
    const cipherText = encryptData(jsonValue, cryptoKey).toString();
    console.log(cipherText);
    await AsyncStorage.setItem(storageKey, cipherText);
    return true;
  } catch (e) {
    console.log(e);
  }
  return false;
}

export async function AsyncStoreString(key, string) {
  try {
    await AsyncStorage.setItem(key, string);
    return true;
  } catch (e) {
    console.log(e);
  }
  return false;
}

export async function AsyncLoadString(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}
