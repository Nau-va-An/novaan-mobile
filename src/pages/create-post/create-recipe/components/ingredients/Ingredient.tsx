import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { type ReactElement } from "react";
import AddIngredient, { type AddIngredientParams } from "./pages/AddIngredient";
import ViewIngredients from "./pages/ViewIngredient";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type IngredientStackParamList = {
    ViewIngredient: undefined;
    AddIngredient: AddIngredientParams;
};

const IngredientStack = createNativeStackNavigator<IngredientStackParamList>();

const Ingredient = (): ReactElement => {
    return (
        <IngredientStack.Navigator initialRouteName="ViewIngredient">
            <IngredientStack.Screen
                name="ViewIngredient"
                options={{
                    headerShown: false,
                }}
                component={ViewIngredients}
            />
            <IngredientStack.Screen
                name="AddIngredient"
                component={AddIngredient}
            />
        </IngredientStack.Navigator>
    );
};

export default Ingredient;
