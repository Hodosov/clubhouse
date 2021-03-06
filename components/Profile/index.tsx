import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";

import style from "./profile.module.scss";
import { ButtonBack } from "@components/BackButton";

interface ProfileProps {
    fullname: string;
    username: string;
    avatarUrl: string;
    about?: string;
}

export const Profile: FC<ProfileProps> = ({
    fullname,
    username,
    avatarUrl,
    about,
}) => {
    return (
        <div className="container mt-40">
            <ButtonBack title="Back" href="/rooms" />

            <div className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                    <Avatar width="100px" height="100px" src={avatarUrl} />

                    <div className="d-flex flex-column ml-30 mr-30">
                        <h2 className="mt-0 mb-0">{fullname}</h2>
                        <h3 className={clsx("mt-0 mb-0", style.username)}>
                            @{username}
                        </h3>
                    </div>
                </div>
                <Button className={style.followButton} color="blue">
                    Follow
                </Button>
            </div>

            <p className={style.about}>{about}</p>
        </div>
    );
};
