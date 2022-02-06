import { useRouter } from "next/router";
import { Header } from "@components/Header";
import { ButtonBack } from "@components/BackButton";

export default function ProfilePage() {
    const {
        query: { id },
    } = useRouter();

    return (
        <>
            <Header />
            <div className="container mt-40">
                <ButtonBack title="All roms" href="/rooms" />
            </div>
        </>
    );
}
