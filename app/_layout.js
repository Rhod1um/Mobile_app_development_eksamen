import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { RootSiblingParent } from "react-native-root-siblings";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

export default function AppLayout() {
  //RootSiblingParent is used for toast
    return (
      <ActionSheetProvider>
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
              <Stack.Screen
                name="(modals)/update"
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
      </ActionSheetProvider>
    );
}
