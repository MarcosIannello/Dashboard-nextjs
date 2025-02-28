'use client';

import { useSession } from "next-auth/react";

export default function ProfilePage() {

    const { data: session } = useSession();


    return (
        <div className="flex flex-col items-center space-y-4">
            <h1 className="font-bold text-3xl font-mon">Profile</h1>
            <hr />
            <div className="flex flex-col items-center space-x-4">
                <span>{session?.user?.name ?? 'UserName'}</span>
                <span>{session?.user?.email ?? 'No Email'}</span>
                <span>{session?.user?.image ?? 'No Image'}</span>
            </div>
        </div>
    );
}