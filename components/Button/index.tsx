import clsx from "clsx";
import React, { FC } from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
    disabled?: boolean;
    color?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

const colors = {
    green: styles.buttonGreen,
    gray: styles.buttonGray,
    blue: styles.buttonBlue,
};

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
