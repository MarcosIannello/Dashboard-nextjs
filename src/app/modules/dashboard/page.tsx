import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Widget } from "@/app/shared/components";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";


export const todos = [
    {
        title: "Create a new design",
        done: false,
        createDate: "2025-09-01"
    }, {
        title: "Create a new design",
        done: false,
        createDate: "2025-09-01"
    }, {
        title: "Create a new design",
        done: false,
        createDate: "2025-09-01"
    }, {
        title: "Create a new design",
        done: false,
        createDate: "2025-09-01"
    }
]

export default async function DashboardPage() {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("api/auth/signin");
    }

    return (
        <div>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <Widget title="Conected User">
                    <h1>{session.user?.name}</h1>
                    <Image src={session.user?.image ?? ''} alt="user image" width={100} height={100} />
                </Widget>
            </div>
        </div>
    );
}