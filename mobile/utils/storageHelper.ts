import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeStringData = async (
  key: string,
  value: string,
  onComplete: (result: boolean, error: any | null) => void
) => {
  try {
    await AsyncStorage.setItem(`@storage_Key/${key}`, value);
    onComplete(true, null);
  } catch (e) {
    onComplete(false, e);
  }
};

export const getStringData = async (
  key: string,
  onComplete: (result: string | null, error: any | null) => void
) => {
  try {
    const value = await AsyncStorage.getItem(`@storage_Key/${key}`);
    onComplete(value, null);
  } catch (e) {
    onComplete(null, e);
  }
};
