import { Endpoint } from "@/utils/schemas"
import { getStoredEndpoints, setStoredEndpoints } from "@/utils/storage"
import { createContext, useContext, useEffect, useState } from "react"

const EndpointsContext = createContext<{
  endpoints: readonly Endpoint[]
  setEndpoints: (endpoints: Endpoint[]) => Promise<void>
  addEndpoint: (endpoint: Endpoint) => Promise<void>
} | null>(null)

export function useEndpointsContext() {
  const context = useContext(EndpointsContext)
  if (!context) {
    throw Error("Call useEndpointContext only from within EndpointsProvider")
  }
  return context
}

export function EndpointsProvider({ children }: { children: React.ReactNode }) {
  const [endpoints, setEndpointsState] = useState([] as Endpoint[])

  async function setEndpoints(endpoints: Endpoint[]) {
    await setStoredEndpoints(endpoints)
    setEndpointsState(endpoints)
  }

  async function addEndpoint(endpoint: Endpoint) {
    setEndpoints([...endpoints, endpoint])
  }

  useEffect(() => {
    void (async () => {
      await setEndpoints(await getStoredEndpoints())
    })()
  }, [])

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
