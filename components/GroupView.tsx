import { StyleSheet, View, ViewProps } from "react-native";
import ItemView, { Item } from "./ItemView";

export interface Group extends ViewProps {
  id: string;
  list: Item[];
}

const GroupView = ({ list, style }: Group) => {
  return (
    <View style={[styles.container, style]}>
      {list.map((item, index) => {
        const isLast = index === list.length - 1;
        return (
          <ItemView
            key={String(item.id)}
            id={item.id}
            label={item.label}
            style={isLast ? { borderBottomWidth: 0 } : {}}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E2126",
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: "hidden"
  }
});

export default GroupView;
