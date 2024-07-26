import { useEndpointsContext } from "@/contexts/endpoints"
import { IntegerString } from "@/utils/schemas"
import { RouterOutputs, trpc } from "@/utils/trpc"
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"

export default function Endpoint() {
  const { endpoint_index } = useLocalSearchParams()
  const { endpoints } = useEndpointsContext()
  const [logs, setLogs] = useState<RouterOutputs["getLogs"]>([])
  const [namespaces, setNamespaces] = useState<RouterOutputs["getNamespaces"]>(
    [],
  )

  useEffect(() => {
    void (async () => {
      setLogs(await trpc.getLogs.query({ limit: 100 }))
    })()
  }, [])

  const endpoint = endpoints[IntegerString.parse(endpoint_index)]
  if (!endpoint) return <EndpointNotFound />

  return (
    <View>
      <Text>{JSON.stringify(endpoint)}</Text>
      {logs.map((log, index) => (
        <View key={index}>{JSON.stringify(log)}</View>
      ))}
    </View>
  )
}

function EndpointNotFound() {
  return (
    <View>
      <Text>Endpoint not found</Text>
    </View>
  )
}
