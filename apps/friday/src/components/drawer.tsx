import { useEndpointsContext } from "@/contexts/endpoints"
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  type DrawerContentComponentProps,
} from "@react-navigation/drawer"
import { router } from "expo-router"
import { Drawer } from "expo-router/drawer"
import { View } from "react-native"

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { endpoints } = useEndpointsContext()
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Home" onPress={() => router.navigate("/")} />
      <View
        style={{
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: 1,
        }}
      />
      {endpoints.map((endpoint, index) => (
        <DrawerItem
          label={endpoint.name ? endpoint.name : endpoint.address}
          onPress={() => router.navigate(`/endpoint/${index}`)}
          key={index}
        />
      ))}
      <View
        style={{
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: 1,
        }}
      />
      <DrawerItem
        label="Add Endpoint"
        onPress={() => router.navigate("/add-endpoint")}
      />
    </DrawerContentScrollView>
  )
}
