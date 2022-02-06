import { FC } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@components/Button";

import styles from "./Room.module.scss";
import Image from "next/image";

interface RoomProps {
  title: string;
}

export const Room: FC<RoomProps> = ({ title }) => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className="d-flex align-items-center justify-content-between">
        <h2>{title}</h2>
        <div
          className={clsx("d-flex align-items-center", styles.actionButtons)}
        >
          <Link href="/rooms">
            <a>
              <Button color="gray" className={styles.leaveButton}>
                <Image
                  width={18}
                  height={18}
                  src="/static/peace.png"
                  alt="Hand black"
                />
                Leave quietly
              </Button>
            </a>
          </Link>
        </div>
      </div>

      <div className="users">
        {/* {users.map((obj) => (
          <Speaker key={obj.fullname} {...obj} />
        ))} */}
      </div>
    </div>
  );
};
