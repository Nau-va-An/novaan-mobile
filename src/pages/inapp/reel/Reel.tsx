import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Reel: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Reel</Text>
        </View>
    );
};

export default Reel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
