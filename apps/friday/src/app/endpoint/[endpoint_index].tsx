import { useEndpointsContext } from "@/contexts/endpoints"
import { IntegerString } from "@/utils/schemas"
import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

export default function Endpoint() {
  console.log("vbdflvjbhdjkfb ")
  const { endpoint_index } = useLocalSearchParams()
  const { endpoints } = useEndpointsContext()

  const endpoint = endpoints[IntegerString.parse(endpoint_index)]
  if (!endpoint) return <EndpointNotFound />

  return (
    <View>
      <Text>{JSON.stringify(endpoint)}</Text>
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
