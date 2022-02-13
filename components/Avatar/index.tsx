import clsx from "clsx";
import React, { FC } from "react";

import styles from "./Avatar.module.scss";

interface AvatarProps {
  src: string;
  width: string;
  height: string;
  className?: string;
  isVoice?: boolean;
  letters?: string;
}

export const Avatar: FC<AvatarProps> = ({
  src,
  width,
  height,
  className,
  isVoice,
  letters,
}) => {
  return (
    <div
      style={{ width, height, backgroundImage: src ? `url(${src})` : "" }}
      className={clsx(
        styles.avatar,
        isVoice ? styles.avatarBorder : "",
        className,
        "d-ib",
        {
          [styles.emptyAvatar]: !src,
        }
      )}
    >
      {!src && letters}
    </div>
  );
};
