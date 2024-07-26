import AsyncStorage from "@react-native-async-storage/async-storage"
import { Endpoint, EndpointsSchema } from "./schemas"

export async function getStoredEndpoints() {
  try {
    const data = await AsyncStorage.getItem("endpoints")
    if (!data) throw Error()
    const endpoints = EndpointsSchema.parse(JSON.parse(data))
    return endpoints
  } catch {
    await setStoredEndpoints([])
    return []
  }
}

export async function setStoredEndpoints(endpoints: Array<Endpoint>) {
  try {
    await AsyncStorage.setItem("endpoints", JSON.stringify(endpoints))
    console.log("dfkjbvjkdf")
  } catch {
    console.error("Error while saving endpoints")
  }
}
