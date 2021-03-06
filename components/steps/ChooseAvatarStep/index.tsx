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
import { Axios } from "@core/axios";

const uploadFile = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("photo", file);
  const { data } = await Axios.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const ChooseAvatarStep: FC = () => {
  const { onNextStep, setFieldValue, userData } = useContext(MainContext);
  const [avatarUrl, setAvatarUrl] = useState<string>(userData.avatarUrl);
  const inputRef = useRef<HTMLInputElement>(null);

  const avatarLetters = userData.fullname
    .split(" ")
    .map((s) => s[0])
    .join("");

  const handleChangeImage = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setAvatarUrl(imgUrl);
      const data = await uploadFile(file);
      target.value = "";
      setAvatarUrl(data.url);
      setFieldValue("avatarUrl", data.url);
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
        title={`Okay ${userData.fullname}!`}
        description="How’s this photo?"
      />
      <WhiteBlock className={clsx("m-auto mt-40", styles.whiteBlock)}>
        <div className={styles.avatar}>
          <Avatar
            width="120px"
            height="120px"
            src={avatarUrl}
            letters={avatarLetters}
          />
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
