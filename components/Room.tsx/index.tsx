import { FC, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Button } from "@components/Button";

import styles from "./Room.module.scss";
import Image from "next/image";
import { Speaker } from "@components/Speaker";

interface RoomProps {
  title: string;
}

type User = {
  id: string;
  fullname: string;
  avatarUrl: string;
};

export const Room: FC<RoomProps> = ({ title }) => {
  const [users, setUsers] = useState<User[]>([]);

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
        {users?.map((obj) => (
          <Speaker key={obj.fullname} {...obj} />
        ))}
      </div>
    </div>
  );
};
