import { Header } from "@components/Header";
import { Profile } from "@components/Profile";
import { useRouter } from "next/router";

export default function ProfilePage() {
    const {
        query: { id },
    } = useRouter();

    return (
        <>
            <Header />
            <Profile
                fullname={"fullname"}
                username={"username"}
                avatarUrl={""}
                about="Test info"
            />
        </>
    );
}
