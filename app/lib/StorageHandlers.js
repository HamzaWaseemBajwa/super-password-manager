import AsyncStorage from "@react-native-community/async-storage";
import * as SecureStore from "expo-secure-store";
import encoder from "crypto-js/enc-utf8";

import { encryptData, decryptData } from "./PasswordUtils";

export async function AsyncLoadObject(storageKey) {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    if (jsonValue != null) {
      if (jsonValue != null) {
        const jsonObject = JSON.parse(jsonValue);
        return jsonObject;
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
    await AsyncStorage.setItem(storageKey, jsonValue);
    return true;
  } catch (e) {
    console.log(e);
  }
  return false;
}

export async function AsyncSecureLoadObject(key) {
  try {
    const objectString = await SecureStore.getItemAsync(key);
    if (objectString != null) {
      const object = JSON.parse(objectString);
      return object;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function AsyncSecureStoreObject(storageKey, object) {
  try {
    const jsonValue = JSON.stringify(object);
    await AsyncStorage.setItem(storageKey, jsonValue);
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
