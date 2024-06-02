import * as SecureStore from 'expo-secure-store'

async function save(key: string, value: any) {
  try {
    await SecureStore.setItemAsync(key, value)
  } catch (error: any) {
    throw new Error(error)
  }
}

async function get(key: string) {
  try {
    const result: string | null = await SecureStore.getItemAsync(key)
    return result
  } catch (error: any) {
    throw new Error(error)
  }
}

function getSync(key: string) {
  try {
    const result: string | null = SecureStore.getItem(key)
    return result
  } catch (error: any) {
    throw new Error(error)
  }
}

function removeItem(key: string) {
  try {
    // await SecureStore.deleteItemAsync(key)
    SecureStore.setItem(key, '')
  } catch (error: any) {
    throw new Error(error)
  }
}

export default { save, get, removeItem, getSync }
