import { AddNewServerEndpoint } from "@/components/screens/add-new"
import { EndpointsProvider } from "@/contexts/endpoints"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"

const Drawer = createDrawerNavigator()

export default function Index() {
  return (
    <EndpointsProvider>
      <NavigationContainer independent={true}>
        <Drawer.Navigator initialRouteName="Add New Server">
          <Drawer.Screen
            name="Add New Server"
            component={AddNewServerEndpoint}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </EndpointsProvider>
  )
}
