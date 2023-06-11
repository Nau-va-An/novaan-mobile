import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CreatePost: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Create Post</Text>
        </View>
    );
};

export default CreatePost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
