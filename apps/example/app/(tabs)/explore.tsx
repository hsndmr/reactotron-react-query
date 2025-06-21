import { Platform, Pressable, StyleSheet, Text } from "react-native"

import ParallaxScrollView from "@/components/ParallaxScrollView"
import { IconSymbol } from "@/components/ui/IconSymbol"
import { useMutation } from "@tanstack/react-query"

export default function TabTwoScreen() {
  const { mutate } = useMutation({
    mutationFn: () => {
      return new Promise((resolve) =>
        setTimeout(() => {
          console.log("mutation done")
        }, 1000)
      )
    },
  })
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <Pressable
        onPress={() => {
          mutate()
        }}
      >
        <Text>Mutation</Text>
      </Pressable>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
})
