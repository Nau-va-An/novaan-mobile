import { type Context } from "react";

export type ExtractGenericContext<Type> = Type extends Context<infer X>
    ? X
    : never;

export type Setter<Type> = {
    [Property in keyof Type as `set${Capitalize<string & Property>}`]: (
        value: Type[Property]
    ) => void;
};
