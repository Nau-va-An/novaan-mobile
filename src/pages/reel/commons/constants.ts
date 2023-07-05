import { BOTTOM_NAV_HEIGHT } from "@/common/constants";
import { windowHeight } from "@/common/utils";

// The additional 10 is to prevent the end of previous item from showing (why is it showing?)
export const SCROLL_ITEM_HEIGHT = windowHeight - BOTTOM_NAV_HEIGHT + 10;
