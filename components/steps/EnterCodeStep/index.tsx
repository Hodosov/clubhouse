import { useRouter } from "next/router";
import { ChangeEvent, FC, useState } from "react";
import clsx from "clsx";
import { WhiteBlock } from "@components/WhiteBlock";
import { StepInfo } from "@components/StepInfo";
import { Button } from "@components/Button";
import Axios from "@core/axios";

import styles from "./EnterPhoneStep.module.scss";

export const EnterCodeStep: FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [codes, setCodes] = useState(["", "", "", ""]);
    const nextDisabled = codes.some((v) => !v);

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const index = Number(event.target.getAttribute("id"));
        const value = event.target.value;
        setCodes((prev) => {
            const newArr = [...prev];
            newArr[index] = value;
            return newArr;
        });

        if (event.target.nextSibling) {
            (event.target.nextSibling as HTMLInputElement).focus();
        }
    };

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            await Axios.get("/todos");
            router.push("/rooms");
        } catch (e) {
            alert("Error actications");
        }
        setIsLoading(false);
    };

    return (
        <div className={styles.block}>
            {!isLoading ? (
                <>
                    <StepInfo
                        icon="/static/numbers.png"
                        title="Enter your activate code"
                    />
                    <WhiteBlock
                        className={clsx("m-auto mt-30", styles.whiteBlock)}
                    >
                        <div className={clsx("mb-30", styles.codeInput)}>
                            {codes.map((code, index) => (
                                <input
                                    key={index}
                                    type="tel"
                                    placeholder="X"
                                    maxLength={1}
                                    id={String(index)}
                                    onChange={handleChangeInput}
                                    value={code}
                                />
                            ))}
                        </div>
                        <Button disabled={nextDisabled} onClick={onSubmit}>
                            Next
                            <img
                                className="d-ib ml-10"
                                src="/static/arrow.svg"
                            />
                        </Button>
                    </WhiteBlock>
                </>
            ) : (
                <div className="text-center">
                    <div className="loader"></div>
                    <h3 className="mt-5">Activation in progress ...</h3>
                </div>
            )}
        </div>
    );
};
