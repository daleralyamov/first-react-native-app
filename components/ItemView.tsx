import { StyleSheet, Text, TouchableHighlight, TouchableHighlightProps } from "react-native";

export interface Item extends TouchableHighlightProps {
  id: string;
  label: string;
}

const ItemView = ({ label, style }: Item) => {
  const handlePress = () => {};
  return (
    <TouchableHighlight
      underlayColor="rgba(255,255,255, 0.1)"
      style={[styles.container, style]}
      onPress={handlePress}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderBottomColor: "#2B2F35",
    borderBottomWidth: 1
  },
  text: {
    fontSize: 16,
    color: "#fff"
  }
});

export default ItemView;
