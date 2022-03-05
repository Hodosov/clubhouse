import clsx from "clsx";
import Link from "next/link";
import React, { FC } from "react";
import { Avatar } from "@components/Avatar";

import styles from "./Header.module.scss";
import { useSelector } from "react-redux";
import { selectUser } from "redux/selectors";

export const Header: FC = () => {
  const userData = useSelector(selectUser);

  return (
    <div className={styles.header}>
      <div className="container d-flex align-items-center justify-content-between">
        <Link href="/rooms">
          <div
            className={clsx(styles.headerLogo, "d-flex align-items-center cup")}
          >
            <img src={"/static/hand-wave.png"} alt="Logo" className="mr-5" />
            <h4>Clubhouse</h4>
          </div>
        </Link>
        <Link href="/profile/1">
          <div className="d-flex align-items-center cup">
            <b className="mr-15">{userData?.fullname || "Гость"}</b>
            <Avatar src={userData?.avatarUrl} width="50px" height="50px" />
          </div>
        </Link>
      </div>
    </div>
  );
};
