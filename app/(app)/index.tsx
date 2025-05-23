import GroupView from "@/components/GroupView";
import TopBarView from "@/components/Topbar";
import { useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const data = [
  {
    id: 1,
    list: [
      {
        id: 1,
        label: "Мой профиль"
      }
    ]
  },
  {
    id: 2,
    list: [
      {
        id: 1,
        label: "Кошелёк"
      }
    ]
  },
  {
    id: 3,
    list: [
      {
        id: 1,
        label: "Избранное"
      },
      {
        id: 2,
        label: "Недавние звонки"
      },
      {
        id: 3,
        label: "Устройства"
      },
      {
        id: 4,
        label: "Папки с чатами"
      }
    ]
  },
  {
    id: 4,
    list: [
      {
        id: 1,
        label: "Уведомления и звуки"
      },
      {
        id: 2,
        label: "Кофиденциальность"
      },
      {
        id: 3,
        label: "Данные и память"
      },
      {
        id: 4,
        label: "Оформление"
      },
      {
        id: 5,
        label: "Энергосбережение"
      },
      {
        id: 6,
        label: "Язык"
      }
    ]
  },
  {
    id: 5,
    list: [
      {
        id: 1,
        label: "Daler Premium"
      },
      {
        id: 2,
        label: "Мои звёзды"
      },
      {
        id: 3,
        label: "Daler для бизнеса"
      },
      {
        id: 4,
        label: "Отправить подарок"
      }
    ]
  },
  {
    id: 6,
    list: [
      {
        id: 1,
        label: "Помощь"
      },
      {
        id: 2,
        label: "Вопросы о Daler"
      },
      {
        id: 3,
        label: "Возможности Daler"
      }
    ]
  }
];

export default function Home() {
  const scrollRef = useRef<FlatList>(null);
  const scrollY = useSharedValue(0);
  const lastY = useSharedValue(0);
  const insets = useSafeAreaInsets();

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
    <View style={styles.container}>
      <TopBarView scrollY={scrollY} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, borderWidth: 1, backgroundColor: "#15171A" },
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
