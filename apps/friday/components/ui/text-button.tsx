import { cn } from "@/utils/helpers"
import { Pressable, Text, View } from "react-native"

export function TextButton({
  text,
  className,
  disabled,
  onPress,
}: {
  text: string
  className?: string
  disabled?: boolean
  onPress?: () => void
}) {
  return (
    <View>
      <Pressable
        className={cn(
          "rounded-xl border-2 border-green-600 bg-green-200 px-4 py-4",
          {
            "opacity-50": disabled,
          },
          className,
        )}
        disabled={disabled}
        onPress={onPress}
      >
        <Text>{text}</Text>
      </Pressable>
    </View>
  )
}
