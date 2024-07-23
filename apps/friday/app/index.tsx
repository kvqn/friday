import { AddNewServerEndpoint } from "@/components/screens/add-new"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import { Text, View } from "react-native"

const Drawer = createDrawerNavigator()

export default function Index() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Add New Server">
        <Drawer.Screen name="Add New Server" component={AddNewServerEndpoint} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
