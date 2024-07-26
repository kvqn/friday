import { useEndpointsContext } from "@/contexts/endpoints"
import { Endpoint } from "@/utils/schemas"
import { Link } from "expo-router"
import { Pressable, Text, View } from "react-native"

export default function Page() {
  const { endpoints } = useEndpointsContext()

  if (endpoints.length === 0)
    return (
      <View>
        <Text>You havent't added any endpoints yet.</Text>
        <AddEndpoint />
      </View>
    )
  return (
    <View>
      {endpoints.map((endpoint, index) => (
        <EndpointLink endpoint={endpoint} index={index} key={index} />
      ))}
    </View>
  )
}

function EndpointLink({
  endpoint,
  index,
}: {
  endpoint: Endpoint
  index: number
}) {
  return (
    <Link href={`/endpoint/${index}`}>
      <Text>{endpoint.address}</Text>
      {endpoint.name && <Text>{endpoint.name}</Text>}
    </Link>
  )
}

function AddEndpoint() {
  return (
    <Link href="/add-endpoint">
      <Text>Add Button</Text>
    </Link>
  )
}
