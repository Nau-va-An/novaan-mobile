import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { type ReactElement } from "react";
import ViewInstruction from "./pages/ViewInstruction";
import AddInstruction, {
    type AddInstructionParams,
} from "./pages/AddInstruction";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type InstructionStackParamList = {
    ViewInstruction: undefined;
    AddInstruction: AddInstructionParams;
};

const InstructionStack =
    createNativeStackNavigator<InstructionStackParamList>();

const Instruction = (): ReactElement => {
    return (
        <InstructionStack.Navigator initialRouteName="ViewInstruction">
            <InstructionStack.Screen
                name="ViewInstruction"
                options={{
                    headerShown: false,
                }}
                component={ViewInstruction}
            />
            <InstructionStack.Screen
                name="AddInstruction"
                component={AddInstruction}
            />
        </InstructionStack.Navigator>
    );
};

export default Instruction;
