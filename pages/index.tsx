import { createContext, useState } from "react";
import { WelcomeStep } from "@components/steps/WelcomeStep";
import { EnterNameStep } from "@components/steps/EnterNameStep";
import { GitHubStep } from "@components/steps/GitHubStep";
import { ChooseAvatarStep } from "@components/steps/ChooseAvatarStep";
import { EnterPhoneStep } from "@components/steps/EnterPhoneStep";
import { EnterCodeStep } from "@components/steps/EnterCodeStep";

const StepsComponents = {
  0: WelcomeStep,
  1: GitHubStep,
  2: EnterNameStep,
  3: ChooseAvatarStep,
  4: EnterPhoneStep,
  5: EnterCodeStep,
};

type MainContextProps = {
  onNextStep: () => void;
  setUserData: (data: UserData) => void;
  setFieldValue: (field: keyof UserData, value: string) => void;
  step: number;
  userData: UserData;
};

export type UserData = {
  id: number;
  fullname: string;
  avatarUrl: string;
  isActive: number;
  username: string;
  phone: string;
  token?: string;
};

export const MainContext = createContext<MainContextProps>(
  {} as MainContextProps
);

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const [userData, setUserData] = useState<UserData>();
  const Step = StepsComponents[step];

  const onNextStep = () => setStep((prev) => ++prev);

  const setFieldValue = (field: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  console.log(userData);

  return (
    <MainContext.Provider
      value={{ step, onNextStep, userData, setUserData, setFieldValue }}
    >
      <Step />
    </MainContext.Provider>
  );
}
