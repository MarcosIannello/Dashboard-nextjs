/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { signOut, useSession } from "next-auth/react";
import { IoShield } from "react-icons/io5";


interface props {
    title: string;
    icon: React.ReactNode;
    link?: string;
}

export const logOut = () => {
    signOut();
}


export const SessionButton = ({ title, icon, link = '' }: props) => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <button onClick={() => logOut()} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <IoShield />
            <span className="group-hover:text-gray-700">Loading...</span>
        </button >
    };

    // if (status === 'authenticated') {
    //     <button onClick={() => logOut()} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
    //         <IoLockClosed />
    //         <span className="group-hover:text-gray-700">{title}</span>
    //     </button >
    // }

    return (
        <button onClick={() => logOut()} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            {icon}
            <span className="group-hover:text-gray-700">{title}</span>
        </button >
    )


}


