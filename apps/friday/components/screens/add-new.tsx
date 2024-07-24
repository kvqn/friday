import { useEffect, useState } from "react"
import {
  Button,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
  ViewBase,
} from "react-native"
import { Input } from "../ui/input"
import { TextButton } from "../ui/text-button"
import { useEndpointContext } from "@/contexts/endpoints"

export function AddNewServerEndpoint() {
  const [ip, setIp] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    console.log(ip.length)
  }, [ip])

  const [buttonText, setButtonText] = useState("Add Endpoint")

  const { addEndpoint } = useEndpointContext()

  return (
    <View className="flex h-full flex-col items-center justify-center gap-4">
      <Text className="text-xl">Add new Friday endpoint</Text>
      <View className="w-[80%]">
        <Text>IP Address</Text>
        <Input placeholder="IP Address" onChangeText={setIp} />
      </View>
      <View className="w-[80%]">
        <Text>Name</Text>
        <Input placeholder="Endpoint Name (Optional)" onChangeText={setName} />
      </View>
      <View>
        <TextButton
          text={buttonText}
          disabled={ip.length == 0}
          onPress={() => {
            addEndpoint({
              address: ip,
              name: name,
            })
          }}
        />
      </View>
    </View>
  )
}
