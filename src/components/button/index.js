import { Pressable, Text, View, StyleSheet } from "react-native";

const Button = (props) => {
  const { title, onClickHandler, buttonStyle } = props;
  return (
    <Pressable onPress={onClickHandler} style={[styles.container, buttonStyle]}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flot:1,
    width:"30%",
    backgroundColor: "#007FFF",
    paddingLeft: 5,
    paddingBottom:10,
    paddingTop:10,
    margin: 5,
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0.5,
  },
  title: {
    letterSpacing: 1,
    color: "#fff",
    textTransform: "capitalize"
  }
});
export default Button;
