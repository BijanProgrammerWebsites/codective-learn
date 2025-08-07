import { ReactElement } from "react";

import clsx from "clsx";

import { Icon, IconifyIconProps } from "@iconify-icon/react";

import { useIconHook } from "@/components/icon/hooks/use-icon.hook";
import { IconCollection } from "@/components/icon/types/icon-collection.type";

import styles from "./icon.module.css";

type Props = Omit<IconifyIconProps, "ref" | "icon" | "ssr" | "color"> & {
  collection?: IconCollection;
  name: string;
};

export default function IconComponent({
  collection = "mingcute",
  name,
  inline = true,
  className,
  ...otherProps
}: Props): ReactElement {
  const iconData = useIconHook(collection, name);

  if (!iconData) {
    console.error(`Icon "${name}" is missing.`);

    return (
      <svg
        width="1em"
        height="1em"
        aria-hidden="true"
        viewBox="0 0 24 24"
      ></svg>
    );
  }

  return (
    <Icon
      icon={iconData}
      className={clsx(styles.icon, className)}
      inline={inline}
      {...otherProps}
    />
  );
}
