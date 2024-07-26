import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-reanimated"

import { useColorScheme } from "@/hooks/useColorScheme"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Drawer } from "expo-router/drawer"
import { EndpointsProvider } from "@/contexts/endpoints"
import { CustomDrawerContent } from "@/components/drawer"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <EndpointsProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer drawerContent={CustomDrawerContent}>
            <Drawer.Screen
              name="index"
              options={{
                title: "Home",
              }}
            />
            <Drawer.Screen
              name="add-endpoint"
              options={{
                title: "Add Endpoint",
              }}
            />
            <Drawer.Screen
              name="endpoint/[endpoint_index]"
              options={{
                title: "Endpoint",
              }}
            />
          </Drawer>
        </GestureHandlerRootView>
      </EndpointsProvider>
    </ThemeProvider>
  )
}
