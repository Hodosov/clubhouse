import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type BackButtonProps = {
    title: string;
    href: string;
};

export const ButtonBack: FC<BackButtonProps> = ({ title, href }) => {
    return (
        <Link href={href}>
            <a>
                <div className="d-flex cup">
                    <Image
                        width={20}
                        height={20}
                        src="/static/back-arrow.svg"
                        alt="Back"
                    />
                    <h3 className="ml-10">{title}</h3>
                </div>
            </a>
        </Link>
    );
};
