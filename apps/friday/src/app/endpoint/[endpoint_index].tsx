import { MultiPickerModal } from "@/components/multi-picker-modal"
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

  const [namespaces, setNamespaces] = useState<
    Array<{ namespace: string; selected: boolean }>
  >([])
  const [namespacePickerVisible, setNamespacePickerVisible] = useState(false)

  const [topics, setTopics] = useState<
    Array<{ namespace: string; topic: string; selected: boolean }>
  >([])
  const [topicPickerVisible, setTopicPickerVisible] = useState(false)

  useEffect(() => {
    void (async () => {
      setNamespaces(
        (await trpc.getNamespaces.query(null)).map((namespace) => ({
          namespace: namespace,
          selected: true,
        })),
      )
    })()
  }, [])

  useEffect(() => {
    void (async () => {
      setTopics(
        (
          await trpc.getTopics.query({
            namespaces: namespaces
              .filter((namespace) => namespace.selected)
              .map((namespace) => namespace.namespace),
          })
        ).map((row) => ({ ...row, selected: true })),
      )
    })()
  }, [namespaces])

  useEffect(() => {
    void (async () => {
      console.log(topics)
      console.log("getting logs")
      setLogs(
        await trpc.getLogs.query({
          limit: 100,
          namespacesAndTopics: topics.filter((topic) => topic.selected),
        }),
      )
    })()
  }, [topics])

  const endpoint = endpoints[IntegerString.parse(endpoint_index)]
  if (!endpoint) return <EndpointNotFound />

  function namespaceRenderer(namespace: (typeof namespaces)[0] | undefined) {
    if (!namespace) return null
    return <Text>{namespace.namespace}</Text>
  }

  function topicRenderer(topic: (typeof topics)[0] | undefined) {
    if (!topic) return null
    return (
      <Text>
        {topic.topic} | {topic.namespace}
      </Text>
    )
  }

  return (
    <View>
      <MultiPickerModal
        title="Namespaces"
        options={namespaces}
        modalVisible={namespacePickerVisible}
        setModalVisible={setNamespacePickerVisible}
        onSave={setNamespaces}
        optionRenderer={namespaceRenderer}
      />
      <MultiPickerModal
        title="Topics"
        options={topics}
        modalVisible={topicPickerVisible}
        setModalVisible={setTopicPickerVisible}
        onSave={setTopics}
        optionRenderer={topicRenderer}
      />
      <Text>{JSON.stringify(endpoint)}</Text>
      {logs.map((log, index) => (
        <Text key={index}>{JSON.stringify(log)}</Text>
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
