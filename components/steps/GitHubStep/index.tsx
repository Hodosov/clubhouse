import clsx from "clsx";
import { WhiteBlock } from "@components/WhiteBlock";
import { Button } from "@components/Button";
import { StepInfo } from "@components/StepInfo";

import styles from "./GitHubStep.module.scss";
import React, { useContext } from "react";
import { MainContext } from "pages";

export const GitHubStep = () => {
    const { onNextStep } = useContext(MainContext);

    return (
        <div className={styles.block}>
            <StepInfo
                icon="/static/connect.png"
                title="Do you want import info from GitHub?"
            />
            <WhiteBlock className={clsx("m-auto mt-40", styles.whiteBlock)}>
                <Button
                    onClick={onNextStep}
                    className={clsx(
                        styles.button,
                        "d-i-flex align-items-center"
                    )}
                >
                    <img className="d-ib mr-10" src="/static/github.svg" />
                    Import from GitHub
                    <img className="d-ib ml-10" src="/static/arrow.svg" />
                </Button>
                <div className="link mt-20 cup d-ib">
                    Enter my info manually
                </div>
            </WhiteBlock>
        </div>
    );
};
