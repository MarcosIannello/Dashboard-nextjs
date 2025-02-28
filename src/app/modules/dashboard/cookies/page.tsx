
import { TabBar } from "@/app/shared/components";
import { cookies } from "next/headers";


export const metadata = {
    title: 'Cookies Page',
    description: 'Cookies Data',
};

export default async function CookiesPage() {

    const cookieStore = await cookies();
    const cookieTab = cookieStore.get('currentTab')?.value ?? '1';


    return (
        <div className="flex flex-col w-full gap-4">

            <h1 className="text-center font-bold">Cookies Page</h1>
            <div className="grid grid-cols-1 gap-3">

                <TabBar currentTab={parseInt(cookieTab)} />

            </div>

        </div>
    );
}