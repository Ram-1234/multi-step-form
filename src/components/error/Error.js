import { View, Text, StyleSheet } from "react-native";

const Error = (props) => {
    const { title, textStyle } = props;
    return (
        <View style={styles.container}>
            <Text style={[styles.title, textStyle]}>{title || "Error"}</Text>
        </View>
    )
}

export default Error

const styles = StyleSheet.create({
    container: {
        float: 1,
    },
    title: {
        color: "red",
        fontSize: 11
    }
})