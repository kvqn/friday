import { useEffect, useState } from "react"
import { Modal, Pressable, Text, View } from "react-native"

export function MultiPickerModal<T>({
  title,
  options,
  optionRenderer,
  modalVisible,
  setModalVisible,
  onSave,
}: {
  title: string
  options: ({ selected: boolean } & T)[]
  modalVisible: boolean
  setModalVisible: (value: boolean) => void
  onSave: (newOptions: typeof options) => void
  optionRenderer: (option: (typeof options)[0]) => React.ReactNode
}) {
  const [_options, _setOptions] = useState(options)
  const countSelected = options.filter((option) => option.selected).length

  useEffect(() => {
    _setOptions(options)
  }, [options])

  return (
    <View>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        {_options.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => {
              console.log(option)
              _setOptions((options) =>
                options.map((option, idx) =>
                  idx === index
                    ? { ...option, selected: !option.selected }
                    : option,
                ),
              )
            }}
            style={{
              backgroundColor: option.selected ? "red" : "white",
            }}
          >
            {optionRenderer(option)}
          </Pressable>
        ))}
        <Pressable
          onPress={() => {
            setModalVisible(false)
          }}
        >
          <Text>Cancel</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setModalVisible(false)
            onSave(_options)
          }}
        >
          <Text>Done</Text>
        </Pressable>
      </Modal>
      <Pressable
        onPress={() => {
          setModalVisible(true)
        }}
      >
        <Text>
          {title} ({countSelected === options.length ? "All" : countSelected}{" "}
          Selected)
        </Text>
      </Pressable>
    </View>
  )
}
