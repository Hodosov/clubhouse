import clsx from "clsx";
import React, { FC } from "react";

import styles from "./Button.module.scss";

const colors = {
    green: styles.buttonGreen,
    gray: styles.buttonGray,
    blue: styles.buttonBlue,
};

interface ButtonProps {
    disabled?: boolean;
    color?: keyof typeof colors;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

export const Button: FC<ButtonProps> = ({
    children,
    disabled,
    color,
    onClick,
    className,
}) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className={clsx(className, styles.button, colors[color])}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
