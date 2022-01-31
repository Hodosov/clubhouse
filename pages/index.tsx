import { useState } from "react";
import { WelcomeStep } from "../components/steps/WelcomeStep";

export default function Home() {
    const [step, setStep] = useState();
    return (
        <div>
            <WelcomeStep />
        </div>
    );
}
