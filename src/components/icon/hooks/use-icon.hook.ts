import { ExtendedIconifyIcon } from "@iconify/types";
import { getIconData } from "@iconify/utils";

import { icons as devIcons } from "@iconify-json/devicon";
import { icons as mingcuteIcons } from "@iconify-json/mingcute";

import { IconCollection } from "@/components/icon/types/icon-collection.type";

export function useIconHook(
  collection: IconCollection,
  name: string,
): ExtendedIconifyIcon | null {
  switch (collection) {
    case "mingcute":
      return getIconData(mingcuteIcons, name);
    case "devicon":
      return getIconData(devIcons, name);
    default:
      return null;
  }
}
