import { createContext, useContext, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { z } from "zod"

const EndpointSchema = z.object({
  address: z.string().url(),
  name: z.string().optional(),
})

export type Endpoint = z.infer<typeof EndpointSchema>

const EndpointsContext = createContext<{
  endpoints: Endpoint[]
  setEndpoints: (endpoints: Endpoint[]) => void
  addEndpoint: (endpoint: Endpoint) => void
} | null>(null)

export function useEndpointContext() {
  const context = useContext(EndpointsContext)
  if (!context) {
    throw new Error(
      "useEndpointContext must be used within an EndpointContextProvider",
    )
  }
  return context
}

export function EndpointsProvider({ children }: { children: React.ReactNode }) {
  const [endpoints, _setEndpoints] = useState([] as Endpoint[])

  async function addEndpoint(endpoint: Endpoint) {
    await setEndpoints([...endpoints, endpoint])
  }

  async function setEndpoints(endpoints: Array<Endpoint>) {
    await AsyncStorage.setItem("endpoints", JSON.stringify(endpoints))
    _setEndpoints(endpoints)
  }

  return (
    <EndpointsContext.Provider
      value={{
        endpoints,
        setEndpoints,
        addEndpoint,
      }}
    >
      {children}
    </EndpointsContext.Provider>
  )
}
