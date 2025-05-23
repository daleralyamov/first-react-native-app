import { StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface TopBar {
  scrollY: SharedValue<number>;
}

const TopBarView = ({ scrollY }: TopBar) => {
  const insets = useSafeAreaInsets();

  const animatedStyles = {
    container: useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(scrollY.value, [60, 140], ["#15171A", "#1E2126"]),
      borderBottomColor: interpolateColor(scrollY.value, [90, 140], ["#15171A", "#2B2F35"]),
      height: interpolate(
        scrollY.value,
        [0, 140],
        [180 + insets.top, 40 + insets.top],
        Extrapolation.CLAMP
      ),
      paddingTop: insets.top
    })),
    text: useAnimatedStyle(() => ({
      fontSize: interpolate(scrollY.value, [0, 140], [30, 18], Extrapolation.CLAMP)
    }))
  };

  return (
    <Animated.View style={[styles.container, animatedStyles.container]}>
      <Animated.Text style={[styles.text, animatedStyles.text]}>Настройки</Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    justifyContent: "flex-end",
    borderBottomWidth: 1,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 30,
    zIndex: 10
  },
  text: {
    color: "#fff"
  }
});

export default TopBarView;
