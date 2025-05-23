import { useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  useSharedValue
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GroupView from "./GroupView";

export interface Option {
  id: number;
  label: string;
}

export interface OptionGroup {
  id: number;
  list: Option[];
}

export interface SettingsList {
  data: OptionGroup[];
  scrollY: SharedValue<number>;
}

export default function SettingsListView({ data, scrollY }: SettingsList) {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<FlatList>(null);
  const lastY = useSharedValue(0);

  const dragEndedWithoutMomentum = useRef(false);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      lastY.value = scrollY.value;
      scrollY.value = event.contentOffset.y;
    }
  });

  const handleSnap = () => {
    const y = scrollY.value;

    if (y > 0 && y < 140)
      if (y > lastY.value) {
        if (y < 60) {
          scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
        } else if (y > 60) {
          scrollRef.current?.scrollToOffset({ offset: 140, animated: true });
        }
      } else if (y < lastY.value) {
        if (y < 80) {
          scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
        } else if (y < 140) {
          scrollRef.current?.scrollToOffset({ offset: 140, animated: true });
        }
      }
  };

  const handleScrollEndDrag = () => {
    dragEndedWithoutMomentum.current = true;

    setTimeout(() => {
      if (dragEndedWithoutMomentum.current) {
        handleSnap();
      }
    }, 50);
  };

  const handleMomentumScrollBegin = () => {
    dragEndedWithoutMomentum.current = false;
  };

  const handleMomentumScrollEnd = () => {
    handleSnap();
  };

  return (
    <Animated.FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      ref={scrollRef}
      onScrollEndDrag={handleScrollEndDrag}
      onMomentumScrollBegin={handleMomentumScrollBegin}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      renderItem={({ item, index }) => {
        const isLast = index === data.length - 1;
        return (
          <GroupView
            id={String(item.id)}
            list={item.list.map((item) => ({ ...item, id: String(item.id) }))}
            style={isLast ? { marginBottom: 0 } : {}}
          />
        );
      }}
      onScroll={handleScroll}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      contentContainerStyle={[styles.scrollContainer, { paddingTop: insets.top + 200 }]}
    />
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 50
  },
  item: {
    backgroundColor: "#24282D",
    height: 100,
    justifyContent: "center",
    paddingHorizontal: 20
  }
});
