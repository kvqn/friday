import { TextInput } from "react-native"
import { twMerge } from "tailwind-merge"

export function Input({
  placeholder,
  className,
  onChangeText,
}: {
  placeholder?: string
  className?: string
  onChangeText?: (text: string) => void
}) {
  return (
    <TextInput
      className={twMerge(
        "w-full rounded-md bg-red-500 px-4 py-2 outline outline-2 outline-slate-400",
        className,
      )}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  )
}
