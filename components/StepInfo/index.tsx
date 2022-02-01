import clsx from "clsx";
import { FC } from "react";
import styles from "./StepInfo.module.scss";

interface StepUnfoProps {
    title: string;
    description?: string;
    icon: string;
}

export const StepInfo: FC<StepUnfoProps> = ({ title, description, icon }) => {
    return (
        <div className={clsx(styles.block, "text-center")}>
            <div>
                <img className={styles.img} src={icon} alt="Step picture" />
            </div>
            <b className={styles.title}>{title}</b>
            {description && <p className={styles.description}>{description}</p>}
        </div>
    );
};
