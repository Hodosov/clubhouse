import React, {
    FC,
    ReactFragment,
    useContext,
    useEffect,
    useState,
} from "react";
import clsx from "clsx";
import { WhiteBlock } from "../../WhiteBlock";
import { Button } from "@components/Button";
import { StepInfo } from "@components/StepInfo";
import { Avatar } from "@components/Avatar";

import styles from "./ChooseAvatarStep.module.scss";
import { useRef } from "react";
import { MainContext } from "pages";

export const ChooseAvatarStep: FC = () => {
    const { onNextStep } = useContext(MainContext);
    const [avatarUrl, setAvatarUrl] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChangeImage = (event: Event): void => {
        const file = (event.target as HTMLInputElement).files[0];
        if (file) {
            const imgUrl = URL.createObjectURL(file);
            setAvatarUrl(imgUrl);
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener("change", handleChangeImage);
        }
    }, []);

    return (
        <div className={styles.block}>
            <StepInfo
                icon="/static/celebration.png"
                title={`Okay!`}
                description="How’s this photo?"
            />
            <WhiteBlock className={clsx("m-auto mt-40", styles.whiteBlock)}>
                <div className={styles.avatar}>
                    <Avatar width="120px" height="120px" src={avatarUrl} />
                </div>
                <div className="mb-30">
                    <label htmlFor="image" className="link cup">
                        Choose a different photo
                    </label>
                </div>
                <input id="image" ref={inputRef} type="file" hidden />
                <Button onClick={onNextStep}>
                    Next
                    <img className="d-ib ml-10" src="/static/arrow.svg" />
                </Button>
            </WhiteBlock>
        </div>
    );
};
