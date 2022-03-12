import { createContext, useEffect, useState } from "react";
import { WelcomeStep } from "@components/steps/WelcomeStep";
import { EnterNameStep } from "@components/steps/EnterNameStep";
import { GitHubStep } from "@components/steps/GitHubStep";
import { ChooseAvatarStep } from "@components/steps/ChooseAvatarStep";
import { EnterPhoneStep } from "@components/steps/EnterPhoneStep";
import { EnterCodeStep } from "@components/steps/EnterCodeStep";
import { checkAuth } from "utils/checkAuth";
import { Axios } from "@core/axios";
import { wrapper } from "redux/store";

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

const getUserData = (): UserData | null => {
  try {
    return JSON.parse(localStorage.getItem("userData"));
  } catch (error) {}
};

const getStep = (): number => {
  const json = getUserData();
  if (json) {
    if (json.phone) {
      return 5;
    }
    return 4;
  }
  return 0;
};

export default function Home() {
  const [step, setStep] = useState<number>(getStep());
  const [userData, setUserData] = useState<UserData>();
  const Step = StepsComponents[step];

  const onNextStep = () => setStep((prev) => ++prev);

  const setFieldValue = (field: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const json = getUserData();
      if (json) {
        setUserData(json);
        setStep(getStep());
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
    Axios.defaults.headers.Authorization = "Bearer " + userData?.token;
  }, [userData]);

  return (
    <MainContext.Provider
      value={{ step, onNextStep, userData, setUserData, setFieldValue }}
    >
      <Step />
    </MainContext.Provider>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  try {
    const user = await checkAuth(ctx);
    if (user) {
      return {
        redirect: {
          destination: "/rooms",
        },
      };
    }
  } catch (error) {
    console.warn(error);
  }

  return { props: {} };
});
