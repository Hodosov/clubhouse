import React, { ChangeEvent, useContext, useState } from "react";
import clsx from "clsx";
import { WhiteBlock } from "@components/WhiteBlock";
import { Button } from "@components/Button";
import { StepInfo } from "@components/StepInfo";

import styles from "./EnterNameStep.module.scss";
import { MainContext } from "pages";

export const EnterNameStep = () => {
    const { onNextStep } = useContext(MainContext);

    const [inputValue, setInputValue] = useState<string>("");
    const nextDisabled = !inputValue;

    const handleChangeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setInputValue(target.value);
    };

    const onClickNextStep = () => {
        onNextStep();
    };

    return (
        <div className={styles.block}>
            <StepInfo
                icon="/static/man.png"
                title="What’s your full name?"
                description="People use real names on Clubhouse :) Thnx!"
            />
            <WhiteBlock className={clsx("m-auto", styles.whiteBlock)}>
                <div className="mt-30 mb-30">
                    <input
                        onChange={handleChangeInput}
                        value={inputValue}
                        className="field"
                        placeholder="Enter fullname"
                    />
                </div>
                <Button disabled={nextDisabled} onClick={onClickNextStep}>
                    Next
                    <img className="d-ib ml-10" src="/static/arrow.svg" />
                </Button>
            </WhiteBlock>
        </div>
    );
};
