import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { RootSiblingParent } from "react-native-root-siblings";

export default function AppLayout() {
    return (
      <RootSiblingParent>
        <>
          <StatusBar style="light" />

          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(modals)/create"
              options={{
                presentation: "modal",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#264c59",
                },
              }}
            />
          </Stack>
        </>
      </RootSiblingParent>
    );
}
