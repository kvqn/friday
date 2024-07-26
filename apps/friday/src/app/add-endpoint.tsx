import { useEndpointsContext } from "@/contexts/endpoints"
import { router } from "expo-router"
import { useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"

export default function Page() {
  return (
    <View>
      <Text>Add Endpoint</Text>
      <EndpointForm />
    </View>
  )
}

function EndpointForm() {
  const { addEndpoint } = useEndpointsContext()
  const [address, setAddress] = useState("")
  const [name, setName] = useState("")
  return (
    <View>
      <View>
        <Text>Address</Text>
        <TextInput onChangeText={setAddress} />
      </View>
      <View>
        <Text>Name</Text>
        <TextInput onChangeText={setName} />
      </View>
      <Pressable
        onPress={() => {
          void (async () => {
            await addEndpoint({
              address,
              name: name.length == 0 ? undefined : name,
            })
            console.log("Added endpoint")
            router.navigate("/")
          })()
        }}
      >
        <Text>Add Endpoint</Text>
      </Pressable>
    </View>
  )
}
