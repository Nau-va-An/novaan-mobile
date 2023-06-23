import { type Context } from "react";

export type extractGenericContext<Type> = Type extends Context<infer X>
    ? X
    : never;
