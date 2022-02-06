import { Button } from "@components/Button";
import { ConversationCard } from "@components/ConversationCard";
import { Header } from "@components/Header";
import Link from "next/link";

export default function RoomsPage() {
    return (
        <>
            <Header />
            <div className="container">
                <div className="mt-40 d-flex align-items-center justify-content-between">
                    <h1>All conversations</h1>
                    <Button color="green">+ Start room</Button>
                </div>

                <div className="mt-20">
                    <Link href={"/rooms/test-room"}>
                        <a>
                            <ConversationCard
                                title={"Create Clubhouse clone"}
                                speakers={[
                                    "https://media.istockphoto.com/photos/excited-woman-wearing-rainbow-cardigan-picture-id1327495437",
                                    "https://media.istockphoto.com/photos/smiling-indian-business-man-working-on-laptop-at-home-office-young-picture-id1307615661?s=612x612",
                                ]}
                                guests={["Vasy Pupkin"]}
                                listenersCount={1}
                            />
                        </a>
                    </Link>
                </div>
            </div>
        </>
    );
}
