import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Home: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
