import { useState } from "react";
import { WelcomeStep } from "../components/steps/WelcomeStep";
import { EnterNameStep } from "../components/steps/EnterNameStep";
import { GitHubStep } from "../components/steps/GitHubStep";
import { ChooseAvatarStep } from "../components/steps/ChooseAvatarStep";

const StepsComponents = {
    0: WelcomeStep,
    1: EnterNameStep,
    2: GitHubStep,
    3: ChooseAvatarStep,
};

export default function Home() {
    const [step, setStep] = useState<number>(3);
    const Step = StepsComponents[step];

    return (
        <div>
            <Step />
        </div>
    );
}
