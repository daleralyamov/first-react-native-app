import SettingsListView, { OptionGroup } from "@/components/SettingsListView";
import TopBarView from "@/components/Topbar";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

const mockdata = [
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
  const scrollY = useSharedValue(0);

  const [data, setData] = useState<OptionGroup[]>([]);

  const handleSaveData = async () => {
    await SecureStore.setItemAsync("settingsOptions", JSON.stringify(mockdata), {
      keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK
    });
  };

  const handleLoadData = async () => {
    const securedData = await SecureStore.getItemAsync("settingsOptions");
    if (securedData !== null) {
      setData(JSON.parse(securedData));
    }
  };

  return (
    <View style={styles.container}>
      <TopBarView scrollY={scrollY} />
      <SettingsListView data={data} scrollY={scrollY} />
      <View style={styles.toolButtons}>
        <Button onPress={handleSaveData} title="Save data" />
        <Button onPress={handleLoadData} title="Load data" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, borderWidth: 1, backgroundColor: "#15171A" },
  toolButtons: {
    position: "absolute",
    bottom: 50,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 20
  }
});
